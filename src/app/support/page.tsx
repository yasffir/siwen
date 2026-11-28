import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support",
  description: "Contact Siwen support.",
};

const linkClass =
  "underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--ink)] hover:decoration-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ink)]";

export default function SupportPage() {
  return (
    <div className="mx-auto grid w-full max-w-[76rem] gap-10 px-6 pt-16 pb-24 md:grid-cols-[22rem_minmax(0,40rem)] md:items-start md:justify-center md:gap-x-16 md:px-10 md:pt-28">
      <header className="md:sticky md:top-10">
        <h1 className="text-[clamp(2.35rem,3.4vw,2.75rem)] leading-[1.05] font-normal tracking-[-0.02em] text-[var(--ink)]">
          Support
        </h1>
        <nav className="mt-8 flex gap-5 text-sm text-[var(--muted)]" aria-label="Legal">
          <Link href="/" className={linkClass}>
            Siwen
          </Link>
          <Link href="/privacy" className={linkClass}>
            Privacy
          </Link>
          <Link href="/terms" className={linkClass}>
            Terms
          </Link>
        </nav>
      </header>
      <article className="max-w-[68ch] text-[1.15rem] leading-7 text-[#3f3f3f]">
        <p>
          For help with the Siwen app, your account, or a subscription, write to{" "}
          <a href="mailto:support@siwen.app" className={linkClass}>
            support@siwen.app
          </a>
          .
        </p>
      </article>
    </div>
  );
}
