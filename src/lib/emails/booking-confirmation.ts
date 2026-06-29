export interface BookingConfirmationData {
  customerName: string;
  customerEmail: string;
  confirmationCode: string;
  date: string;        // e.g. "Wednesday, 9 July 2026"
  time: string;        // e.g. "10:00 AM"
  calendarLink: string;
}

export function bookingConfirmationHtml(data: BookingConfirmationData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAF8F5;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F5;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:16px;border:1px solid #E8E4DF;overflow:hidden;max-width:560px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#B07A2F;padding:28px 40px;text-align:center;">
            <span style="font-size:22px;font-weight:700;color:#FFFFFF;letter-spacing:-0.3px;">RadianceCare</span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px 28px;">
            <p style="margin:0 0 6px;font-size:13px;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Session Confirmed</p>
            <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:#1A1A1A;line-height:1.2;">You're booked, ${data.customerName}!</h1>
            <p style="margin:0 0 28px;font-size:15px;color:#6B7280;line-height:1.6;">
              Your 15-minute wellness session has been confirmed. We look forward to seeing you.
            </p>

            <!-- Session details -->
            <div style="background:#FBF4E8;border:1px solid #E8D5B0;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 0;">
                    <span style="font-size:12px;color:#9A6925;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Date</span><br>
                    <span style="font-size:15px;font-weight:600;color:#1A1A1A;">${data.date}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0 6px;border-top:1px solid #E8D5B0;margin-top:10px;">
                    <span style="font-size:12px;color:#9A6925;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Time</span><br>
                    <span style="font-size:15px;font-weight:600;color:#1A1A1A;">${data.time} · 15 minutes</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0 0;border-top:1px solid #E8D5B0;">
                    <span style="font-size:12px;color:#9A6925;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Confirmation Code</span><br>
                    <span style="font-size:18px;font-weight:700;color:#B07A2F;font-family:monospace;letter-spacing:0.15em;">${data.confirmationCode}</span>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Calendar CTA -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
              <tr>
                <td style="background:#B07A2F;border-radius:50px;padding:14px 28px;">
                  <a href="${data.calendarLink}" style="font-size:14px;font-weight:700;color:#FFFFFF;text-decoration:none;">Add to Google Calendar</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#FAF8F5;border-top:1px solid #E8E4DF;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;">Need to reschedule? Contact us at support@radiancecare.com</p>
            <p style="margin:8px 0 0;font-size:11px;color:#C8A97E;">© 2026 RadianceCare · Built by Philip Obiri</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
