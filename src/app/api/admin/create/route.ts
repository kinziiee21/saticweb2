import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const session = request.cookies.get("satic_admin_session");
    if (session?.value !== "authenticated_admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { type, title, description, speaker_name, speaker_bio, session_date, duration_min, meet_link, start_date, end_date, whatsapp_link, status } = body;

    if (type === "session") {
      if (!title || !session_date) {
        return NextResponse.json({ error: "Title and date are required." }, { status: 400 });
      }

      const { data, error } = await supabase
        .from("sessions")
        .insert({
          title,
          description,
          speaker_name,
          speaker_bio,
          session_date,
          duration_min: duration_min ? parseInt(duration_min) : 60,
          meet_link,
          is_published: true,
        })
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ success: true, data }, { status: 201 });
    } 
    
    if (type === "batch") {
      if (!title || !start_date) {
        return NextResponse.json({ error: "Title and start date are required." }, { status: 400 });
      }

      const { data, error } = await supabase
        .from("batches")
        .insert({
          title,
          description,
          start_date,
          end_date,
          whatsapp_link,
          status: status || "upcoming",
        })
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ success: true, data }, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid entity type" }, { status: 400 });

  } catch (err: any) {
    console.error("Admin creation error:", err);
    return NextResponse.json({ error: err.message || "Failed to create resource." }, { status: 500 });
  }
}
