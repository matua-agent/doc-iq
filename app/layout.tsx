import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DocIQ — Document Intelligence",
  description:
    "Paste any document — legal agreements, research papers, technical specs — and ask questions in plain language. Get cited answers powered by AI.",
  openGraph: {
    title: "DocIQ — Document Intelligence",
    description:
      "Ask any question about any document. Get answers with exact citations from the text.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased h-full">{children}</body>
    </html>
  );
}
