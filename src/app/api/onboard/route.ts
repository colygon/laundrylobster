import { NextResponse } from "next/server";
import twilio from "twilio";

export const runtime = "nodejs";

function initialOnboardingMessage() {
  return (
    "LaundryLobster 🦞 here! Quick questions so we can match you with the right helper:\n\n" +
    "1) Do you have a washer + dryer at home? Reply 1 for Yes, 2 for No (takeout wash & fold).\n" +
    "2) Any preferences? (delicates, hang dry, detergent)\n" +
    "3) What day/time would be good for a visit in San Francisco?\n\n" +
    "Reply STOP to stop."
  );
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as null | { phone?: string };
  const phone = body?.phone?.trim();

  if (!phone) {
    return NextResponse.json(
      { ok: false, message: "Please enter a phone number." },
      { status: 400 },
    );
  }

  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;

  // If Twilio isn't configured yet, still accept the signup so the UI works.
  // (We can swap this to a DB write later.)
  if (!sid || !token || !from) {
    return NextResponse.json({
      ok: true,
      message:
        "Got it! SMS isn’t configured yet on our end — but you’re on the list. (Admin: add TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_FROM_NUMBER in Vercel env vars.)",
    });
  }

  try {
    const client = twilio(sid, token);
    await client.messages.create({
      to: phone,
      from,
      body: initialOnboardingMessage(),
    });

    return NextResponse.json({
      ok: true,
      message: "Text sent! Reply to the message and we’ll take it from there.",
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to send text message.";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
