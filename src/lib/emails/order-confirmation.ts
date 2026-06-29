export interface OrderConfirmationData {
  customerName: string;
  customerEmail: string;
  orderRef: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
}

export function orderConfirmationHtml(data: OrderConfirmationData): string {
  const rows = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #F0EBE3;font-size:14px;color:#1A1A1A;">${item.name} × ${item.quantity}</td>
        <td style="padding:10px 0;border-bottom:1px solid #F0EBE3;font-size:14px;color:#1A1A1A;text-align:right;">GH₵ ${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`
    )
    .join("");

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
            <p style="margin:0 0 6px;font-size:13px;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Order Confirmed</p>
            <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:#1A1A1A;line-height:1.2;">Thank you, ${data.customerName}!</h1>
            <p style="margin:0 0 28px;font-size:15px;color:#6B7280;line-height:1.6;">
              Your order has been received and is being processed. You'll receive a delivery update once your items are dispatched.
            </p>

            <!-- Reference -->
            <div style="background:#FBF4E8;border:1px solid #E8D5B0;border-radius:10px;padding:14px 20px;margin-bottom:28px;">
              <p style="margin:0;font-size:12px;color:#9A6925;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;">Order Reference</p>
              <p style="margin:6px 0 0;font-size:18px;font-weight:700;color:#B07A2F;font-family:monospace;letter-spacing:0.1em;">${data.orderRef}</p>
            </div>

            <!-- Items -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
              <tr>
                <td style="font-size:12px;font-weight:600;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.08em;padding-bottom:10px;">Item</td>
                <td style="font-size:12px;font-weight:600;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.08em;padding-bottom:10px;text-align:right;">Price</td>
              </tr>
              ${rows}
              <tr>
                <td style="padding:14px 0 0;font-size:15px;font-weight:700;color:#1A1A1A;">Total</td>
                <td style="padding:14px 0 0;font-size:18px;font-weight:700;color:#B07A2F;text-align:right;">GH₵ ${data.total.toFixed(2)}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#FAF8F5;border-top:1px solid #E8E4DF;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;">Questions? Reply to this email or contact us at support@radiancecare.com</p>
            <p style="margin:8px 0 0;font-size:11px;color:#C8A97E;">© 2026 RadianceCare · Built by Philip Obiri</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
