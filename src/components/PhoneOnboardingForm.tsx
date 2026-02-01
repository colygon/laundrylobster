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

export function PhoneOnboardingForm() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string>("");

  const normalized = useMemo(() => normalizePhone(phone), [phone]);

  async function submit() {
    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalized }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Try again.");
        return;
      }
      setStatus("sent");
      setMessage(
        data.message ||
          "Text sent! Reply to the message to tell us what you need.",
      );
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div>
      <label
        className="block text-sm font-semibold text-zinc-950 dark:text-zinc-50"
        htmlFor="phone"
      >
        Phone number
      </label>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
        We’ll text you from LaundryLobster to get the details.
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
        <button
          type="button"
          onClick={submit}
          disabled={status === "sending" || phone.trim().length < 7}
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl bg-red-600 px-5 font-semibold text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Text me to start"}
        </button>
      </div>

      {message ? (
        <div
          className={
            "mt-4 rounded-2xl border px-4 py-3 text-sm " +
            (status === "error"
              ? "border-red-200 bg-red-50 text-red-800 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-200"
              : "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200")
          }
        >
          {message}
        </div>
      ) : null}

      <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
        Tip: include country code (like +1) if you’re not in the US.
      </p>
    </div>
  );
}
