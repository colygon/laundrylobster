import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-xs font-semibold text-zinc-700 backdrop-blur dark:border-white/10 dark:bg-black/40 dark:text-zinc-200">
      {children}
    </span>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-black">
      <h3 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        {title}
      </h3>
      <div className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <SiteNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-red-50 via-zinc-50 to-zinc-50 dark:from-red-950/25 dark:via-black dark:to-black" />
          <div className="mx-auto w-full max-w-6xl px-5 py-20 md:py-28">
            <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="flex flex-wrap gap-2">
                  <Pill>📍 Now serving San Francisco</Pill>
                  <Pill>🧤 Signature red gloves</Pill>
                  <Pill>🏠 On-site service (in your home)</Pill>
                  <Pill>💬 Book by text (iMessage / WhatsApp / Telegram)</Pill>
                  <Pill>🛡️ OpenClaw AI-vetted helpers</Pill>
                  <Pill>🫧 Gentle, dependable, kind</Pill>
                </div>

                <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
                  Laundry day,
                  <span className="text-red-600 dark:text-red-400"> handled</span>.
                  <br />
                  Like a warm hug for your hamper.
                </h1>

                <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                  A LaundryLobster comes to your home, does your laundry on-site,
                  folds and hangs everything neatly, and can even make the bed.
                  Signature red gloves included — wholesome attitude guaranteed.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/get-started"
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-red-600 px-5 font-semibold text-white hover:bg-red-500"
                  >
                    Get started
                  </Link>
                  <Link
                    href="/do-my-laundry"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 font-semibold text-zinc-900 hover:bg-zinc-100 dark:border-white/15 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-zinc-950 px-5 font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    See MoltyPass
                  </Link>
                  <Link
                    href="/#how"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 font-semibold text-zinc-900 hover:bg-zinc-100 dark:border-white/15 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5"
                  >
                    How it works
                  </Link>
                </div>

                <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
                  Now at <span className="font-semibold">laundrylobster.com</span>
                </p>
              </div>

              <div className="w-full max-w-md">
                <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-black">
                  <div className="relative h-48 w-full">
                    <Image
                      src="/images/red-gloves-person.png"
                      alt="Signature red gloves"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-900 backdrop-blur dark:bg-black/60 dark:text-zinc-50">
                      🧤 Signature red gloves
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                          Today’s wholesome checklist
                        </div>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                          You relax. We do the laundry thing.
                        </p>
                      </div>
                      <div className="rounded-2xl bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300">
                        New
                      </div>
                    </div>
                    <ul className="mt-5 space-y-3 text-sm">
                      <li className="flex gap-2">
                        <span className="mt-0.5">✅</span>
                        <span>In-home service (your laundry stays with you)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-0.5">✅</span>
                        <span>Wash, dry, fold + hang (and make the bed)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-0.5">✅</span>
                        <span>Chat + schedule by text (iMessage/WhatsApp/Telegram)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-0.5">✅</span>
                        <span>OpenClaw AI helps screen + background check helpers</span>
                      </li>
                    </ul>

                    <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
                      <div className="font-semibold">What’s a LaundryLobster?</div>
                      <p className="mt-1 leading-6">
                        A LaundryLobster is a friendly human helper who picks up your
                        laundry, cleans it carefully, and returns it folded and cozy.
                        You’ll spot them by the signature red gloves.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mx-auto w-full max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
          <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-300">
            Simple steps. Soft socks. Everyone wins.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Card title="1) Schedule">
              Text us on iMessage, WhatsApp, or Telegram to pick a time and share
              preferences. (App coming later — for now, we keep it friendly and
              simple.)
            </Card>
            <Card title="2) We lobster up">
              A LaundryLobster arrives with signature red gloves, confirms your
              preferences, and gets to work right in your home — so your laundry
              never has to leave the house.
            </Card>
            <Card title="3) Clean + cozy">
              We wash, dry, fold (or hang), and leave everything neat and cozy.
              Optional add-ons: takeout wash/fold and dry cleaning.
            </Card>
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          className="mx-auto w-full max-w-6xl px-5 py-16"
        >
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-white/10 dark:bg-black">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Services
                </h2>
                <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-300">
                  Built for real life: busy weeks, tiny humans, gym habits, and
                  the occasional “where did all my socks go?” mystery.
                </p>
              </div>
              <Link
                href="/pricing"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-red-600 px-5 font-semibold text-white hover:bg-red-500"
              >
                Get MoltyPass savings
              </Link>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <Card title="Wash + fold">
                Everyday laundry, carefully cleaned and folded into tidy stacks.
              </Card>
              <Card title="Hang-dry / delicate care">
                Sweaters, delicates, and the “please don’t shrink this” pile.
              </Card>
              <Card title="Bedding + towels">
                Big fluffy loads, done right. Your future self will say thanks.
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-5 pb-20">
          <div className="rounded-3xl bg-zinc-950 p-10 text-white dark:bg-white dark:text-zinc-950">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Ready to stop thinking about laundry?
                </h2>
                <p className="mt-2 max-w-2xl text-white/80 dark:text-zinc-700">
                  MoltyPass is our little subscription that makes laundry help
                  cheaper, easier, and more predictable.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/pricing"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-5 font-semibold text-zinc-950 hover:bg-zinc-100 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-800"
                >
                  View plans
                </Link>
                <Link
                  href="/faq"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-5 font-semibold text-white hover:bg-white/10 dark:border-zinc-900/15 dark:text-zinc-950 dark:hover:bg-zinc-950/5"
                >
                  Read FAQ
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
