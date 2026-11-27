import { readFileSync } from "node:fs";
import path from "node:path";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export type LegalDocument = {
  title: string;
  date: string;
  version: string;
  blocks: LegalBlock[];
};

export function readLegal(filename: "privacy-policy.md" | "terms-of-use.md"): LegalDocument {
  const raw = readFileSync(path.join(process.cwd(), filename), "utf8");
  return parseLegal(raw);
}

export function parseLegal(raw: string): LegalDocument {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  let title = "";
  let date = "";
  let version = "";
  const blocks: LegalBlock[] = [];
  let index = 0;

  while (index < lines.length && lines[index].trim() === "") index += 1;

  if (lines[index]?.startsWith("# ")) {
    title = lines[index].slice(2).trim();
    index += 1;
  }

  while (index < lines.length && lines[index].trim() === "") index += 1;

  if (/^https?:\/\/\S+$/.test(lines[index]?.trim() ?? "")) index += 1;

  while (index < lines.length && lines[index].trim() === "") index += 1;

  const meta = lines[index]?.trim() ?? "";
  const metaMatch = meta.match(/^Last updated:\s*(.+?)\.\s*Version\s+(\d+)\.?$/);
  if (metaMatch) {
    date = metaMatch[1];
    version = metaMatch[2];
    index += 1;
  }

  while (index < lines.length) {
    while (index < lines.length && lines[index].trim() === "") index += 1;
    if (index >= lines.length) break;

    const line = lines[index];

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].startsWith("- ")) {
        items.push(lines[index].slice(2).trim());
        index += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (index < lines.length && lines[index].startsWith("|")) {
        tableLines.push(lines[index]);
        index += 1;
      }
      const parsed = tableLines
        .filter((row) => !/^\|\s*-+/.test(row))
        .map((row) =>
          row
            .split("|")
            .slice(1, -1)
            .map((cell) => cell.trim()),
        );
      const [headers, ...rows] = parsed;
      if (headers) blocks.push({ type: "table", headers, rows });
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() !== "" &&
      !lines[index].startsWith("#") &&
      !lines[index].startsWith("- ") &&
      !lines[index].startsWith("|")
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    if (paragraph.length) blocks.push({ type: "p", text: paragraph.join(" ") });
  }

  return { title, date, version, blocks };
}
