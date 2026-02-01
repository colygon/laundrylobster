"use client";

import { useMemo, useState } from "react";

function normalizePhone(input: string) {
  const raw = input.trim();
  // If user types a leading +, keep it. Otherwise assume US and strip non-digits.
  if (raw.startsWith("+")) return raw.replace(/\s+/g, "");
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return raw;
}

function digitsOnlyE164(phoneE164: string) {
  return phoneE164.replace(/^\+/, "").replace(/\D/g, "");
}

function onboardingText() {
  return (
    "Hi LaundryLobster! 🦞 I want to get started.\n\n" +
    "1) Do I have a washer + dryer at home?\n" +
    "2) Or should we do takeout wash & fold?\n" +
    "3) What day/time is good for a visit in San Francisco?\n" +
    "4) Any preferences (delicates, hang dry, detergent)?"
  );
}

export function PhoneOnboardingForm() {
  const [phone, setPhone] = useState("");
  const [copied, setCopied] = useState(false);

  const normalized = useMemo(() => normalizePhone(phone), [phone]);
  const digits = useMemo(() => digitsOnlyE164(normalized), [normalized]);
  const msg = useMemo(() => onboardingText(), []);

  const smsHref = useMemo(() => {
    // `sms:` works for iMessage/SMS deep linking on iOS.
    const body = encodeURIComponent(msg);
    return `sms:${digits}?&body=${body}`;
  }, [digits, msg]);

  const waHref = useMemo(() => {
    const text = encodeURIComponent(msg);
    return `https://wa.me/${digits}?text=${text}`;
  }, [digits, msg]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(msg);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // no-op
    }
  }

  const valid = phone.trim().length >= 7 && digits.length >= 10;

  return (
    <div>
      <label
        className="block text-sm font-semibold text-zinc-950 dark:text-zinc-50"
        htmlFor="phone"
      >
        Phone number
      </label>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
        We’ll use this to open a chat with LaundryLobster.
      </p>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          id="phone"
          className="h-12 w-full rounded-xl border border-zinc-300 bg-white px-3 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500/25 dark:border-white/15 dark:bg-black dark:text-zinc-50 dark:placeholder:text-zinc-500"
          inputMode="tel"
          placeholder="(415) 555-0123"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <a
          href={valid ? smsHref : "#"}
          className={
            "inline-flex h-12 items-center justify-center rounded-xl px-4 font-semibold " +
            (valid
              ? "bg-red-600 text-white hover:bg-red-500"
              : "cursor-not-allowed bg-zinc-200 text-zinc-500 dark:bg-white/10 dark:text-zinc-500")
          }
          onClick={(e) => {
            if (!valid) e.preventDefault();
          }}
        >
          iMessage / SMS
        </a>

        <a
          href={valid ? waHref : "#"}
          className={
            "inline-flex h-12 items-center justify-center rounded-xl px-4 font-semibold " +
            (valid
              ? "bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              : "cursor-not-allowed bg-zinc-200 text-zinc-500 dark:bg-white/10 dark:text-zinc-500")
          }
          onClick={(e) => {
            if (!valid) e.preventDefault();
          }}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>

        <a
          href="https://t.me/colinai"
          className="inline-flex h-12 items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 font-semibold text-zinc-900 hover:bg-zinc-100 dark:border-white/15 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5"
          target="_blank"
          rel="noreferrer"
        >
          Telegram
        </a>
      </div>

      <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
        <div className="flex items-center justify-between gap-3">
          <div className="font-semibold text-zinc-950 dark:text-zinc-50">
            Message we’ll send
          </div>
          <button
            type="button"
            onClick={copy}
            className="inline-flex h-9 items-center justify-center rounded-xl bg-white px-3 text-xs font-semibold text-zinc-900 hover:bg-zinc-100 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="mt-3 whitespace-pre-wrap text-xs leading-5 text-zinc-600 dark:text-zinc-300">
          {msg}
        </pre>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          Telegram can’t auto-fill a message to a username; tap Telegram, then
          paste the copied text.
        </p>
      </div>

      <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
        Tip: include country code (like +1) if you’re not in the US.
      </p>
    </div>
  );
}
