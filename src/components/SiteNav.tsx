"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative block h-4 w-5">
      <span
        className={
          "absolute left-0 top-0 block h-0.5 w-5 rounded bg-current transition-transform duration-200 " +
          (open ? "translate-y-[7px] rotate-45" : "")
        }
      />
      <span
        className={
          "absolute left-0 top-[7px] block h-0.5 w-5 rounded bg-current transition-opacity duration-200 " +
          (open ? "opacity-0" : "opacity-100")
        }
      />
      <span
        className={
          "absolute left-0 top-[14px] block h-0.5 w-5 rounded bg-current transition-transform duration-200 " +
          (open ? "-translate-y-[7px] -rotate-45" : "")
        }
      />
    </span>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu on route hash navigation (best-effort)
  useEffect(() => {
    function onHashChange() {
      setOpen(false);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/60">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-5 sm:py-4">
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
            🦞
          </span>
          <span className="text-base sm:text-lg">LaundryLobster</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 text-sm font-medium text-zinc-700 dark:text-zinc-200 md:flex">
          <Link className="hover:text-zinc-950 dark:hover:text-white" href="/do-my-laundry">
            Do my laundry
          </Link>
          <Link className="hover:text-zinc-950 dark:hover:text-white" href="/#how">
            How it works
          </Link>
          <Link className="hover:text-zinc-950 dark:hover:text-white" href="/#services">
            Services
          </Link>
          <Link className="hover:text-zinc-950 dark:hover:text-white" href="/pricing">
            MoltyPass
          </Link>
          <Link className="hover:text-zinc-950 dark:hover:text-white" href="/faq">
            FAQ
          </Link>
        </nav>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/do-my-laundry"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-red-600 px-3 text-sm font-semibold text-white hover:bg-red-500"
          >
            Do my laundry
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100 dark:border-white/15 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div className="border-t border-zinc-200 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-black/90 md:hidden">
          <nav className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-5">
            <div className="grid gap-1 text-sm font-medium text-zinc-800 dark:text-zinc-100">
              <Link
                className="rounded-xl px-3 py-3 hover:bg-zinc-100 dark:hover:bg-white/5"
                href="/#how"
                onClick={() => setOpen(false)}
              >
                How it works
              </Link>
              <Link
                className="rounded-xl px-3 py-3 hover:bg-zinc-100 dark:hover:bg-white/5"
                href="/#services"
                onClick={() => setOpen(false)}
              >
                Services
              </Link>
              <Link
                className="rounded-xl px-3 py-3 hover:bg-zinc-100 dark:hover:bg-white/5"
                href="/pricing"
                onClick={() => setOpen(false)}
              >
                MoltyPass
              </Link>
              <Link
                className="rounded-xl px-3 py-3 hover:bg-zinc-100 dark:hover:bg-white/5"
                href="/faq"
                onClick={() => setOpen(false)}
              >
                FAQ
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
