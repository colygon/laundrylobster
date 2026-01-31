import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

function PriceCard({
  name,
  monthly,
  annual,
  highlight,
}: {
  name: string;
  monthly: string;
  annual: string;
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
          Best value
        </div>
      ) : null}

      <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
        {name}
      </div>

      <div className="mt-4 grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4 text-sm dark:border-white/10 dark:bg-black">
        <div className="flex items-baseline justify-between gap-4">
          <div className="font-semibold text-zinc-950 dark:text-zinc-50">
            Monthly
          </div>
          <div className="text-zinc-700 dark:text-zinc-200">{monthly}</div>
        </div>

        <div className="flex items-baseline justify-between gap-4">
          <div className="font-semibold text-zinc-950 dark:text-zinc-50">Annual</div>
          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
            <span>{annual}</span>
            <span className="inline-flex items-center rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-semibold text-white">
              2 months FREE Trial
            </span>
          </div>
        </div>
      </div>

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
        Start MoltyPass
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
            One membership. Simple. Wholesome. MoltyPass gives you ongoing discounts
            on LaundryLobster services — with an annual option that’s basically two
            months free.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <PriceCard
            name="MoltyPass"
            monthly="$9.99"
            annual="$99.99"
            highlight
          />
          <PriceCard
            name="MoltyPass for Students"
            monthly="$4.99"
            annual="$48.00"
          />
        </div>

        <div className="mt-12 rounded-3xl border border-zinc-200 bg-white p-8 dark:border-white/10 dark:bg-black">
          <h2 className="text-2xl font-semibold tracking-tight">
            What does MoltyPass get me?
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-zinc-600 dark:text-zinc-300">
            MoltyPass is our membership that gives you a discount on LaundryLobster
            services. Monthly is simple, annual is the best deal (basically two
            free months).
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
