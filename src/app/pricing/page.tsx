import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

function PriceCard({
  name,
  price,
  blurb,
  bullets,
  highlight,
}: {
  name: string;
  price: string;
  blurb: string;
  bullets: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={
        "relative rounded-2xl border p-6 shadow-sm " +
        (highlight
          ? "border-red-200 bg-red-50/60 dark:border-red-900/40 dark:bg-red-950/20"
          : "border-zinc-200 bg-white dark:border-white/10 dark:bg-black")
      }
    >
      {highlight ? (
        <div className="absolute -top-3 left-6 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
          Most lovable
        </div>
      ) : null}

      <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
        {name}
      </div>
      <div className="mt-2 flex items-end gap-2">
        <div className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {price}
        </div>
        <div className="pb-1 text-sm text-zinc-600 dark:text-zinc-300">/mo</div>
      </div>
      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
        {blurb}
      </p>

      <ul className="mt-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-0.5">✅</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <button
        className={
          "mt-6 inline-flex h-11 w-full cursor-not-allowed items-center justify-center rounded-xl px-4 font-semibold opacity-70 " +
          (highlight
            ? "bg-red-600 text-white"
            : "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950")
        }
        type="button"
        disabled
      >
        Choose {name}
      </button>

      <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
        Checkout coming soon. Cancel anytime once it’s live.
      </p>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <SiteNav />

      <main className="mx-auto w-full max-w-6xl px-5 py-16">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold tracking-tight">MoltyPass</h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            MoltyPass is LaundryLobster’s subscription that gives you discounts on
            services. Think of it like a loyalty program—just warmer, softer, and
            slightly more lobster.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Prices are placeholders (we can tune these once you decide your market).
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <PriceCard
            name="Lil’ Pinch"
            price="$9"
            blurb="For occasional laundry wins."
            bullets={["10% off services", "Monthly member perks", "Priority reschedule"]}
          />
          <PriceCard
            name="Red Glove"
            price="$19"
            blurb="For regulars who like predictable discounts."
            bullets={["15% off services", "Faster pickup windows", "Delicates care notes"]}
            highlight
          />
          <PriceCard
            name="Big Claw"
            price="$39"
            blurb="For busy households and fluffy towel people."
            bullets={["20% off services", "Top priority windows", "Bonus bedding discount"]}
          />
        </div>

        <div className="mt-12 rounded-3xl border border-zinc-200 bg-white p-8 dark:border-white/10 dark:bg-black">
          <h2 className="text-2xl font-semibold tracking-tight">
            What about TaskLobster?
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-zinc-600 dark:text-zinc-300">
            TaskLobster is the broader brand idea: one friendly helper for chores
            beyond laundry. LaundryLobster is the first product, and MoltyPass is
            the membership that makes it cheaper.
          </p>
          <div className="mt-6">
            <Link
              className="text-sm font-semibold text-red-600 hover:underline"
              href="/"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
