import { NextResponse } from "next/server";
import { resend, FROM } from "@/lib/resend";
import { bookingConfirmationHtml, type BookingConfirmationData } from "@/lib/emails/booking-confirmation";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingConfirmationData;

    if (!body.customerEmail || !body.confirmationCode) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: FROM,
      to: body.customerEmail,
      subject: `Your RadianceCare session is confirmed — ${body.confirmationCode}`,
      html: bookingConfirmationHtml(body),
    });

    if (error) {
      console.error("[email/booking]", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[email/booking]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
