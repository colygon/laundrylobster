import Link from "next/link";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-black/50">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
            🦞
          </span>
          <span>LaundryLobster</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-zinc-700 dark:text-zinc-200">
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
      </div>
    </header>
  );
}
