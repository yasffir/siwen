import Link from "next/link";
import { Statement } from "@/components/statement";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col items-center px-6 pt-16 pb-8">
      <div className="flex flex-1 items-center">
        <Statement />
      </div>
      <nav className="flex gap-6" aria-label="Legal">
        <Link
          href="/privacy"
          className="text-sm text-[var(--muted)] underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--ink)] hover:decoration-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ink)]"
        >
          Privacy
        </Link>
        <Link
          href="/terms"
          className="text-sm text-[var(--muted)] underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--ink)] hover:decoration-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ink)]"
        >
          Terms
        </Link>
      </nav>
    </div>
  );
}
