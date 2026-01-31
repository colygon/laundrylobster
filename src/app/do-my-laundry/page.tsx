import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

function Row({
  label,
  standard,
  member,
}: {
  label: string;
  standard: string;
  member: string;
}) {
  return (
    <div className="grid grid-cols-3 gap-3 border-t border-zinc-200 py-4 text-sm dark:border-white/10">
      <div className="font-semibold text-zinc-950 dark:text-zinc-50">{label}</div>
      <div className="text-zinc-700 dark:text-zinc-200">{standard}</div>
      <div className="text-zinc-700 dark:text-zinc-200">{member}</div>
    </div>
  );
}

export default function DoMyLaundryPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <SiteNav />

      <main className="mx-auto w-full max-w-6xl px-5 py-16">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold tracking-tight">Do my laundry</h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            Here’s simple pricing, side-by-side. MoltyPass members get the same
            service for less.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Note: prices are a starter menu while we finalize SF operations.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-black">
          <div className="grid grid-cols-3 gap-3 bg-zinc-50 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:bg-white/5 dark:text-zinc-300">
            <div>Service</div>
            <div>Standard</div>
            <div>
              MoltyPass
              <span className="ml-2 inline-flex items-center rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                member pricing
              </span>
            </div>
          </div>

          <div className="px-6">
            <Row
              label="On-site laundry visit"
              standard="$119 / visit"
              member="$99 / visit"
            />
            <Row
              label="Extra time (after 2 hours)"
              standard="$35 / 30 min"
              member="$29 / 30 min"
            />
            <Row label="Delicates / hang dry" standard="+$10" member="Included" />
            <Row
              label="Takeout wash/fold"
              standard="$2.50 / lb"
              member="$2.10 / lb"
            />
            <Row
              label="Dry cleaning add-on"
              standard="At cost + fee"
              member="At cost + lower fee"
            />
          </div>

          <div className="border-t border-zinc-200 px-6 py-5 text-sm text-zinc-600 dark:border-white/10 dark:text-zinc-300">
            <p>
              Want the member pricing?{' '}
              <Link className="font-semibold text-red-600 hover:underline" href="/pricing">
                Get MoltyPass
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="mailto:hello@laundrylobster.com?subject=LaundryLobster%20—%20Do%20my%20laundry"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-zinc-950 px-5 font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Request a visit
          </a>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 font-semibold text-zinc-900 hover:bg-zinc-100 dark:border-white/15 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5"
          >
            Back to home
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
