import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, jobTitle, schoolName, mobile, email, numTeachers } = body;

    // Validation
    if (!fullName || !jobTitle || !schoolName || !mobile || !email) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const { data: enquiry, error } = await supabase
      .from("school_enquiries")
      .insert({
        full_name: fullName.trim(),
        job_title: jobTitle.trim(),
        school_name: schoolName.trim(),
        mobile: mobile.trim(),
        email: email.toLowerCase().trim(),
        num_teachers: numTeachers ? parseInt(numTeachers) : null,
        status: "new"
      })
      .select("id")
      .single();

    if (error) {
      console.error("School Enquiry insert error:", error);
      return NextResponse.json({ error: "Failed to submit enquiry. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true, enquiryId: enquiry.id }, { status: 201 });

  } catch (err) {
    console.error("School Enquiry API error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
