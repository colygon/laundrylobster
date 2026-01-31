import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200/70 py-12 text-sm text-zinc-600 dark:border-white/10 dark:text-zinc-300">
      <div className="mx-auto w-full max-w-6xl px-5">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-semibold text-zinc-950 dark:text-zinc-50">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                🦞
              </span>
              <span>LaundryLobster</span>
            </div>
            <p className="max-w-sm leading-6">
              Wholesome laundry help, delivered. Our lobsters show up with signature
              red gloves and a gentle obsession with neat folds.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="font-semibold text-zinc-950 dark:text-zinc-50">
                Company
              </div>
              <ul className="space-y-2">
                <li>
                  <Link className="hover:underline" href="/faq">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/pricing">
                    MoltyPass
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-zinc-950 dark:text-zinc-50">
                Legal
              </div>
              <ul className="space-y-2">
                <li>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    Privacy (coming soon)
                  </span>
                </li>
                <li>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    Terms (coming soon)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-semibold text-zinc-950 dark:text-zinc-50">
              Early access
            </div>
            <p className="leading-6">
              Want this in your city? We’ll email when we open a new tidepool.
            </p>
            <div className="flex gap-2">
              <input
                className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 dark:border-white/15 dark:bg-black dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:ring-white/20"
                type="email"
                placeholder="you@domain.com"
                disabled
              />
              <button
                className="h-11 shrink-0 cursor-not-allowed rounded-xl bg-zinc-950 px-4 font-semibold text-white opacity-60 dark:bg-white dark:text-zinc-950"
                type="button"
                disabled
              >
                Notify me
              </button>
            </div>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Email capture coming soon.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-zinc-200/70 pt-6 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} LaundryLobster. All rights reserved.</p>
          <p>MoltyPass is a subscription for discounts.</p>
        </div>
      </div>
    </footer>
  );
}
