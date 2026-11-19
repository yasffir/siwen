import Link from "next/link";
import type { ReactNode } from "react";
import type { LegalBlock } from "@/lib/legal";

function resolveHref(href: string) {
  if (href.includes("privacy")) return "/privacy";
  if (href.startsWith("/") || href.startsWith("http")) return href;
  return null;
}

function renderInline(text: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  return text.split(pattern).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-medium text-[var(--ink)]">
          {part.slice(2, -2)}
        </strong>
      );
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!link) return part;

    const href = resolveHref(link[2]);
    const className =
      "underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ink)]";

    if (!href) return link[1];
    if (href.startsWith("/")) {
      return (
        <Link key={index} href={href} className={className}>
          {link[1]}
        </Link>
      );
    }

    return (
      <a key={index} href={href} className={className}>
        {link[1]}
      </a>
    );
  });
}

function Title({ title }: { title: string }) {
  const words = title.split(" ");
  if (words.length < 3) return title;

  return (
    <>
      {words[0]}
      <br />
      {words.slice(1).join(" ")}
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "h2") {
    return (
      <h2 className="mt-10 mb-3 text-[1.2rem] leading-7 font-normal text-[var(--ink)]">
        {block.text}
      </h2>
    );
  }

  if (block.type === "ul") {
    return (
      <ul className="my-4 list-disc space-y-2 pl-5">
        {block.items.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "table") {
    return (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-[0.95rem] leading-6">
          <thead>
            <tr>
              {block.headers.map((header) => (
                <th
                  key={header}
                  className="border-b border-[var(--line)] py-2 pr-4 font-medium text-[var(--ink)]"
                >
                  {renderInline(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.join("|")}>
                {row.map((cell, index) => (
                  <td
                    key={`${cell}-${index}`}
                    className="border-b border-[var(--line)] py-3 pr-4 align-top"
                  >
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <p className="mb-4">{renderInline(block.text)}</p>;
}

export function LegalDocumentView({
  title,
  date,
  version,
  blocks,
}: {
  title: string;
  date: string;
  version: string;
  blocks: LegalBlock[];
}) {
  return (
    <div className="mx-auto grid w-full max-w-[76rem] gap-10 px-6 pt-16 pb-24 md:grid-cols-[22rem_minmax(0,40rem)] md:items-start md:justify-center md:gap-x-16 md:px-10 md:pt-28">
      <header className="md:sticky md:top-10">
        <p className="text-sm text-[var(--muted)]">
          {date}
          {version ? ` · Version ${version}` : ""}
        </p>
        <h1 className="mt-5 text-[clamp(2.35rem,3.4vw,2.75rem)] leading-[1.05] font-normal tracking-[-0.02em] text-[var(--ink)]">
          <Title title={title} />
        </h1>
        <nav className="mt-8 flex gap-5 text-sm text-[var(--muted)]" aria-label="Legal">
          <Link
            href="/"
            className="underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--ink)] hover:decoration-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ink)]"
          >
            Siwen
          </Link>
          <Link
            href="/privacy"
            className="underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--ink)] hover:decoration-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ink)]"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--ink)] hover:decoration-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ink)]"
          >
            Terms
          </Link>
        </nav>
      </header>
      <article className="max-w-[68ch] text-[1.15rem] leading-7 text-[#3f3f3f]">
        {blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </article>
    </div>
  );
}
