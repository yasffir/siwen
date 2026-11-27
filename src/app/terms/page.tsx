import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/legal-document";
import { readLegal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The agreement for using Siwen.",
};

export default function TermsPage() {
  const document = readLegal("terms-of-use.md");

  return <LegalDocumentView {...document} />;
}
