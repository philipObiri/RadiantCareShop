import { NextResponse } from "next/server";
import { resend, FROM } from "@/lib/resend";
import { orderConfirmationHtml, type OrderConfirmationData } from "@/lib/emails/order-confirmation";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderConfirmationData;

    if (!body.customerEmail || !body.orderRef) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: FROM,
      to: body.customerEmail,
      subject: `Order confirmed — ${body.orderRef}`,
      html: orderConfirmationHtml(body),
    });

    if (error) {
      console.error("[email/order]", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[email/order]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
