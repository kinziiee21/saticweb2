import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { memberId, paymentId, orderId, signature, method } = body;

    if (!memberId) {
      return NextResponse.json({ error: "Member ID is required." }, { status: 400 });
    }

    // Record the payment in Supabase
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        member_id:           memberId,
        razorpay_order_id:   orderId   || null,
        razorpay_payment_id: paymentId || `sim_${Date.now()}`,
        razorpay_signature:  signature || null,
        amount:              49900, // ₹499 in paise
        currency:            "INR",
        status:              "paid",
        payment_method:      method || "upi",
      })
      .select("id")
      .single();

    if (paymentError) {
      console.error("Payment insert error:", paymentError);
      return NextResponse.json({ error: "Failed to record payment." }, { status: 500 });
    }

    // Activate the member's subscription
    const membershipStart = new Date();
    const membershipEnd   = new Date();
    membershipEnd.setFullYear(membershipEnd.getFullYear() + 1);

    const { data: updatedMember, error: memberUpdateError } = await supabase
      .from("members")
      .update({
        status:           "active",
        membership_start: membershipStart.toISOString(),
        membership_end:   membershipEnd.toISOString(),
      })
      .eq("id", memberId)
      .select("full_name, email, member_id")
      .single();

    if (memberUpdateError) {
      console.error("Member update error:", memberUpdateError);
      return NextResponse.json({ error: "Failed to activate membership." }, { status: 500 });
    }

    // Option A: Sign up user using Supabase Auth (which automatically sends the signup email)
    if (updatedMember?.email) {
      try {
        // Generate a random temporary password (since we are creating an account passwordlessly first)
        const tempPassword = Math.random().toString(36).slice(-10) + "Satic2026!";
        
        // This registers the user in Supabase auth.users
        const { error: signUpError } = await supabase.auth.signUp({
          email: updatedMember.email,
          password: tempPassword,
          options: {
            data: {
              full_name: updatedMember.full_name,
              member_id: updatedMember.member_id,
            }
          }
        });

        if (signUpError) {
          console.warn("Supabase Auth sign up warning (non-fatal):", signUpError.message);
        } else {
          console.log("Supabase Auth sign up triggered & email sent to:", updatedMember.email);
        }
      } catch (authErr) {
        // Non-fatal warning log: payment was already successfully confirmed in DB
        console.error("Supabase Auth creation error (non-fatal):", authErr);
      }
    }

    return NextResponse.json(
      { success: true, paymentId: payment.id },
      { status: 200 }
    );
  } catch (err) {
    console.error("Payment confirm error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
