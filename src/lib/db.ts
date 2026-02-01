import { sql } from "@vercel/postgres";

export async function ensureTelegramTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS telegram_onboarding (
      chat_id BIGINT PRIMARY KEY,
      username TEXT,
      first_name TEXT,
      last_name TEXT,
      state TEXT NOT NULL,
      has_machine BOOLEAN,
      wants_takeout BOOLEAN,
      visit_time TEXT,
      preferences TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS telegram_onboarding_state_idx
    ON telegram_onboarding(state);
  `;
}

export async function touchTelegram(chatId: string) {
  await sql`
    UPDATE telegram_onboarding
    SET updated_at = NOW()
    WHERE chat_id = ${chatId};
  `;
}
