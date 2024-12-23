import type { Metadata } from "next";
import "./globals.css";

// const scopeOne = Scope_One({
//   variable: '--font-scope-one',
//   subsets: ['latin'],
//   weight: '400',
// });

export const metadata: Metadata = {
  title: "The GSAP Concepts",
  description:
    "Scroll animation projects built with GSAP, Lenis and Motion, written in Next.JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="The GSAP Concepts"
          content="Scroll animation projects built with GSAP, Lenis and Motion, written in Next.JS"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
