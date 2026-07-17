import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      mobile,
      schoolName,
      city,
      state,
      teachingLevel,
      subject,
      experience,
    } = body;

    // Validate required fields
    if (!fullName || !email || !mobile || !schoolName || !city || !state || !subject) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Check if member already exists
    const { data: existing } = await supabase
      .from("members")
      .select("id, email, status")
      .eq("email", email.toLowerCase())
      .single();

    if (existing) {
      if (existing.status === "active") {
        return NextResponse.json(
          { error: "A member with this email already has an active membership." },
          { status: 409 }
        );
      }
      // If pending, return their existing member ID so payment can proceed
      return NextResponse.json(
        { success: true, memberId: existing.id, isExisting: true },
        { status: 200 }
      );
    }

    // Insert new member record
    const { data: member, error } = await supabase
      .from("members")
      .insert({
        full_name:      fullName.trim(),
        email:          email.toLowerCase().trim(),
        mobile:         mobile.trim(),
        school_name:    schoolName.trim(),
        city:           city.trim(),
        state:          state.trim(),
        teaching_level: teachingLevel,
        subject:        subject.trim(),
        experience:     experience,
        status:         "pending",
      })
      .select("id, email")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to register member. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, memberId: member.id, email: member.email },
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
