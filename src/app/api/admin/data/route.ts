import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    // Validate session cookie
    const session = request.cookies.get("satic_admin_session");
    if (session?.value !== "authenticated_admin") {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    // 1. Fetch all members ordered by newest first
    const { data: members, error: membersError } = await supabase
      .from("members")
      .select("*")
      .order("created_at", { ascending: false });

    if (membersError) throw membersError;

    // 2. Fetch payments
    const { data: payments, error: paymentsError } = await supabase
      .from("payments")
      .select("*, members(full_name, email)")
      .order("created_at", { ascending: false });

    if (paymentsError) throw paymentsError;

    // 3. Fetch sessions
    const { data: sessions, error: sessionsError } = await supabase
      .from("sessions")
      .select("*")
      .order("session_date", { ascending: false });

    if (sessionsError) throw sessionsError;

    // 4. Fetch batches
    const { data: batches, error: batchesError } = await supabase
      .from("batches")
      .select("*")
      .order("start_date", { ascending: false });

    if (batchesError) throw batchesError;

    // Compute Summary stats
    const totalMembers = members.length;
    const activeMembers = members.filter((m) => m.status === "active").length;
    const pendingMembers = members.filter((m) => m.status === "pending").length;
    
    // Total revenue in Rupees (amount is stored in paise)
    const totalRevenue = payments
      .filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0) / 100;

    return NextResponse.json({
      stats: {
        totalMembers,
        activeMembers,
        pendingMembers,
        totalRevenue,
      },
      members,
      payments,
      sessions,
      batches,
    }, { status: 200 });

  } catch (err: any) {
    console.error("Admin data fetch error:", err);
    return NextResponse.json({ error: err.message || "Failed to load admin dashboard data." }, { status: 500 });
  }
}
