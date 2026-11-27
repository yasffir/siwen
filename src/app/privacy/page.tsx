import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/legal-document";
import { readLegal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Siwen handles what you put into the app.",
};

export default function PrivacyPage() {
  const document = readLegal("privacy-policy.md");

  return <LegalDocumentView {...document} />;
}
