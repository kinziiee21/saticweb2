import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || "saticadmin2026";

    if (password === adminPassword) {
      const response = NextResponse.json({ success: true }, { status: 200 });
      
      // Set secure HTTP-only cookie for session persistence (lasts 7 days)
      response.cookies.set("satic_admin_session", "authenticated_admin", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid admin password." }, { status: 401 });
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // Check auth session
  const session = request.cookies.get("satic_admin_session");
  if (session?.value === "authenticated_admin") {
    return NextResponse.json({ authenticated: true }, { status: 200 });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE() {
  // Logout endpoint
  const response = NextResponse.json({ success: true }, { status: 200 });
  response.cookies.set("satic_admin_session", "", { path: "/", maxAge: 0 });
  return response;
}
