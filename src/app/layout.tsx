import type { Metadata } from "next";
import "./globals.css";

// const scopeOne = Scope_One({
//   variable: '--font-scope-one',
//   subsets: ['latin'],
//   weight: '400',
// });

export const metadata: Metadata = {
  title: "The GSAP Concepts",
  description: "Lots of pages animated with gsap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
