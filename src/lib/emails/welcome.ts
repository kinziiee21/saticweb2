interface WelcomeEmailProps {
  fullName: string;
  email: string;
  memberId: string;
  membershipEnd: string;
  whatsappLink?: string;
}

export function WelcomeEmailHtml({
  fullName,
  memberId,
  membershipEnd,
  whatsappLink = "https://chat.whatsapp.com/satic-community",
}: WelcomeEmailProps): string {
  const firstName = fullName.split(" ")[0];
  const validUntil = new Date(membershipEnd).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to SATIC Teachers' Club</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4ff;font-family:'Segoe UI',Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4ff;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(30,91,215,0.10);">

          <!-- Header Banner -->
          <tr>
            <td style="background:linear-gradient(135deg,#1E5BD7 0%,#123A8F 100%);padding:40px 32px;text-align:center;">
              <div style="background:rgba(255,255,255,0.15);display:inline-block;border-radius:12px;padding:10px 20px;margin-bottom:20px;">
                <span style="color:#ffffff;font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">SATIC</span>
              </div>
              <h1 style="color:#ffffff;margin:0 0 8px 0;font-size:28px;font-weight:700;line-height:1.3;">Welcome to the<br/>Teachers' Club! 🎓</h1>
              <p style="color:rgba(255,255,255,0.80);margin:0;font-size:15px;">Your membership is now active.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 32px;">

              <p style="color:#2D2D2D;font-size:16px;margin:0 0 20px 0;">Dear <strong>${firstName}</strong>,</p>
              <p style="color:#555;font-size:15px;line-height:1.7;margin:0 0 24px 0;">
                Congratulations! Your membership to <strong style="color:#1E5BD7;">SATIC – The Science and Technology Integrated Club</strong> has been successfully activated. We're thrilled to have you as part of our growing community of educators across India.
              </p>

              <!-- Membership Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#f0f4ff,#e8eeff);border:1.5px solid #c7d7f7;border-radius:12px;margin-bottom:28px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;letter-spacing:2px;color:#1E5BD7;text-transform:uppercase;">Membership Details</p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
                      <tr>
                        <td style="padding:6px 0;color:#777;font-size:13px;width:45%;">Member ID</td>
                        <td style="padding:6px 0;color:#2D2D2D;font-size:13px;font-weight:700;">${memberId}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#777;font-size:13px;">Plan</td>
                        <td style="padding:6px 0;color:#2D2D2D;font-size:13px;font-weight:700;">Annual Membership</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#777;font-size:13px;">Amount Paid</td>
                        <td style="padding:6px 0;color:#2D2D2D;font-size:13px;font-weight:700;">₹499</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#777;font-size:13px;">Valid Until</td>
                        <td style="padding:6px 0;color:#2D2D2D;font-size:13px;font-weight:700;">${validUntil}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- What's next -->
              <p style="color:#2D2D2D;font-size:14px;font-weight:700;margin:0 0 12px 0;letter-spacing:0.5px;text-transform:uppercase;">What's Included in Your Membership</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${[
                  ["📅", "Live Teachers' Talk Sessions", "Monthly expert-led webinars on pedagogy, AI tools, and career growth"],
                  ["📝", "Daily Practice Batches", "Structured 30-day focused learning programs for classroom skills"],
                  ["🤝", "Exclusive Community Access", "Connect with 1000+ educators across India on WhatsApp"],
                  ["📚", "Resource Library", "Curated lesson plans, templates, and teaching aids"],
                ].map(([icon, title, desc]) => `
                <tr>
                  <td style="padding:8px 0;vertical-align:top;width:36px;">
                    <span style="font-size:20px;">${icon}</span>
                  </td>
                  <td style="padding:8px 0 8px 8px;vertical-align:top;">
                    <p style="margin:0;font-size:14px;font-weight:600;color:#2D2D2D;">${title}</p>
                    <p style="margin:2px 0 0 0;font-size:13px;color:#777;">${desc}</p>
                  </td>
                </tr>`).join("")}
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                <tr>
                  <td align="center">
                    <a href="${whatsappLink}" style="display:inline-block;background:linear-gradient(135deg,#1E5BD7,#123A8F);color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;letter-spacing:0.3px;">
                      Join the WhatsApp Community →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color:#888;font-size:13px;margin:28px 0 0 0;line-height:1.7;">
                If you have any questions, simply reply to this email or reach out to us at <a href="mailto:support@satic.in" style="color:#1E5BD7;">support@satic.in</a>.<br/>
                We look forward to growing together! 🌱
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f7f9ff;border-top:1px solid #e8eeff;padding:20px 32px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#aaa;">© ${new Date().getFullYear()} SATIC – The Teachers' Club. All rights reserved.</p>
              <p style="margin:6px 0 0 0;font-size:11px;color:#bbb;">This email was sent because you joined SATIC. Please do not reply to this automated email.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
