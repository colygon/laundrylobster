import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { PhoneOnboardingForm } from "@/components/PhoneOnboardingForm";

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <SiteNav />

      <main className="mx-auto w-full max-w-3xl px-5 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Get started</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          Enter your phone number, then choose how you’d like to chat:
          iMessage/SMS, WhatsApp, or Telegram. No long forms.
        </p>

        <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-black">
          <PhoneOnboardingForm />
          <p className="mt-4 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            By continuing, you agree to be contacted by LaundryLobster by the
            channel(s) you choose. Msg &amp; data rates may apply for SMS.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 dark:border-white/10 dark:bg-black dark:text-zinc-300">
          <div className="font-semibold text-zinc-950 dark:text-zinc-50">
            What we’ll ask in the text
          </div>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Do you have a washer and dryer at home?</li>
            <li>Would you prefer takeout wash &amp; fold instead?</li>
            <li>What time would be good for a visit?</li>
            <li>Any preferences (delicates, hang dry, detergent)?</li>
          </ul>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
