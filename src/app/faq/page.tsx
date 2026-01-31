import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

function QA({ q, a }: { q: string; a: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-black">
      <div className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        {q}
      </div>
      <div className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
        {a}
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <SiteNav />

      <main className="mx-auto w-full max-w-6xl px-5 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">FAQ</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          The quick answers, with maximum kindness.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <QA
            q="Is LaundryLobster real?"
            a={
              <>
                Yes — we’re launching in <span className="font-semibold">San Francisco</span>.
                This site is live, and we’re turning on real booking + payments +
                SMS next.
              </>
            }
          />
          <QA
            q="What’s with the red gloves?"
            a={
              <>
                It’s our signature. They’re clean, bright, and make it obvious a
                LaundryLobster is “on duty.” Also: they look adorable.
              </>
            }
          />
          <QA
            q="What does MoltyPass include?"
            a={
              <>
                MoltyPass is a subscription that gives you a discount on services.
                We can tune the tiers later; for now it’s a friendly way to show
                the idea.
              </>
            }
          />
          <QA
            q="Do you do dry cleaning?"
            a={
              <>
                Not in this first build. We can add “partner drop-off” later if
                you want, but the initial vibe is wholesome wash/dry/fold.
              </>
            }
          />
          <QA
            q="How fast is turnaround?"
            a={
              <>
                In San Francisco, we’re aiming for <span className="font-semibold">next-day</span>
                turnaround by default, with <span className="font-semibold">same-day</span>
                available for select pickup windows.
              </>
            }
          />
          <QA
            q="Can we rename things later?"
            a={
              <>
                Yep. Domain, pricing, and wording are all easy to adjust. We’re
                starting with a clean foundation.
              </>
            }
          />
        </div>

        <div className="mt-12">
          <Link className="text-sm font-semibold text-red-600 hover:underline" href="/">
            ← Back to home
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
