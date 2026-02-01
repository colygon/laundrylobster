import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    return NextResponse.json(
      { ok: false, message: "Missing TELEGRAM_BOT_TOKEN" },
      { status: 400 },
    );
  }

  const hookUrl = process.env.TELEGRAM_WEBHOOK_URL;
  if (!hookUrl) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Missing TELEGRAM_WEBHOOK_URL (set it to https://laundrylobster.com/api/telegram/webhook)",
      },
      { status: 400 },
    );
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: hookUrl }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(
      { ok: false, status: res.status, data },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, data });
}
