import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

export const metadata: Metadata = {
  title: "Yahoo Feed Specifications",
  description: "Technical specifications for Yahoo content ingestion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutShell>
          {children}
        </LayoutShell>
      </body>
    </html>
  );
}
