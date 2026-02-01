import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { ensureTelegramTables, touchTelegram } from "@/lib/db";

export const runtime = "nodejs";

type TelegramUpdate = {
  update_id: number;
  message?: {
    message_id: number;
    date: number;
    text?: string;
    chat: {
      id: number;
      type: "private" | string;
    };
    from?: {
      id: number;
      is_bot: boolean;
      first_name?: string;
      last_name?: string;
      username?: string;
    };
  };
};

type TelegramFrom = NonNullable<NonNullable<TelegramUpdate["message"]>["from"]>;

function normalizeYesNo(text: string) {
  const t = text.trim().toLowerCase();
  if (["1", "y", "yes", "yeah", "yep", "sure", "ok", "okay"].includes(t))
    return true;
  if (["2", "n", "no", "nope", "nah"].includes(t)) return false;
  return null;
}

async function telegramSend(chatId: number, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("Missing TELEGRAM_BOT_TOKEN");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Telegram send failed: ${res.status} ${body}`);
  }
}

type OnboardingRow = {
  chat_id: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  state: string;
  has_machine: boolean | null;
  wants_takeout: boolean | null;
  visit_time: string | null;
  preferences: string | null;
  created_at: string;
  updated_at: string;
};

async function getOrCreate(
  chatId: string,
  from?: TelegramFrom,
): Promise<OnboardingRow> {
  const existing = await sql`
    SELECT * FROM telegram_onboarding WHERE chat_id = ${chatId};
  `;

  if (existing.rows.length) return existing.rows[0] as OnboardingRow;

  await sql`
    INSERT INTO telegram_onboarding (
      chat_id,
      username,
      first_name,
      last_name,
      state
    ) VALUES (
      ${chatId},
      ${from?.username ?? null},
      ${from?.first_name ?? null},
      ${from?.last_name ?? null},
      ${"ASK_MACHINE"}
    );
  `;

  const created = await sql`
    SELECT * FROM telegram_onboarding WHERE chat_id = ${chatId};
  `;
  return created.rows[0] as OnboardingRow;
}

export async function POST(req: Request) {
  const update = (await req.json().catch(() => null)) as TelegramUpdate | null;
  if (!update?.message?.chat?.id) {
    return NextResponse.json({ ok: true });
  }

  // only support private chats
  if (update.message.chat.type !== "private") {
    return NextResponse.json({ ok: true });
  }

  await ensureTelegramTables();

  const chatIdNum = update.message.chat.id;
  const chatId = String(chatIdNum);
  const text = (update.message.text || "").trim();

  const row = await getOrCreate(chatId, update.message.from);
  await touchTelegram(chatId);

  // start / reset
  if (text === "/start" || text.toLowerCase().includes("get started")) {
    await sql`
      UPDATE telegram_onboarding
      SET state = ${"ASK_MACHINE"},
          has_machine = NULL,
          wants_takeout = NULL,
          visit_time = NULL,
          preferences = NULL,
          updated_at = NOW()
      WHERE chat_id = ${chatId};
    `;

    await telegramSend(
      chatIdNum,
      "Welcome to <b>LaundryLobster</b> 🦞\n\nFirst question: do you have a <b>washer + dryer</b> at home?\n\nReply <b>1</b> for Yes or <b>2</b> for No.",
    );

    return NextResponse.json({ ok: true });
  }

  const state = row.state as string;

  if (state === "ASK_MACHINE") {
    const yn = normalizeYesNo(text);
    if (yn === null) {
      await telegramSend(chatIdNum, "Reply <b>1</b> for Yes or <b>2</b> for No.");
      return NextResponse.json({ ok: true });
    }

    await sql`
      UPDATE telegram_onboarding
      SET has_machine = ${yn},
          state = ${yn ? "ASK_TIME" : "ASK_TAKEOUT"},
          updated_at = NOW()
      WHERE chat_id = ${chatId};
    `;

    if (yn) {
      await telegramSend(
        chatIdNum,
        "Great. What day/time would be good for a visit in <b>San Francisco</b>?\n\nExample: \"Tomorrow 6pm\" or \"Sat morning\".",
      );
    } else {
      await telegramSend(
        chatIdNum,
        "No problem. Would you like <b>takeout wash & fold</b> instead?\n\nReply <b>1</b> for Yes or <b>2</b> for No.",
      );
    }

    return NextResponse.json({ ok: true });
  }

  if (state === "ASK_TAKEOUT") {
    const yn = normalizeYesNo(text);
    if (yn === null) {
      await telegramSend(chatIdNum, "Reply <b>1</b> for Yes or <b>2</b> for No.");
      return NextResponse.json({ ok: true });
    }

    await sql`
      UPDATE telegram_onboarding
      SET wants_takeout = ${yn},
          state = ${"ASK_TIME"},
          updated_at = NOW()
      WHERE chat_id = ${chatId};
    `;

    await telegramSend(
      chatIdNum,
      "Perfect. What day/time would be good for a visit (or pickup) in <b>San Francisco</b>?\n\nExample: \"Tomorrow 6pm\" or \"Sat morning\".",
    );

    return NextResponse.json({ ok: true });
  }

  if (state === "ASK_TIME") {
    if (!text) {
      await telegramSend(chatIdNum, "What day/time works best for you?");
      return NextResponse.json({ ok: true });
    }

    await sql`
      UPDATE telegram_onboarding
      SET visit_time = ${text},
          state = ${"ASK_PREFS"},
          updated_at = NOW()
      WHERE chat_id = ${chatId};
    `;

    await telegramSend(
      chatIdNum,
      "Last one: any preferences? (delicates, hang dry, detergent, fragrance-free, etc.)\n\nReply \"none\" if you’re easy.",
    );

    return NextResponse.json({ ok: true });
  }

  if (state === "ASK_PREFS") {
    const prefs = text || "none";

    await sql`
      UPDATE telegram_onboarding
      SET preferences = ${prefs},
          state = ${"DONE"},
          updated_at = NOW()
      WHERE chat_id = ${chatId};
    `;

    await telegramSend(
      chatIdNum,
      "All set — thank you 🦞\n\nWe’ll follow up shortly to confirm your visit time.",
    );

    return NextResponse.json({ ok: true });
  }

  // DONE (or unknown) – let them restart
  await telegramSend(
    chatIdNum,
    "You’re already set. If you want to start over, type /start.",
  );
  return NextResponse.json({ ok: true });
}
