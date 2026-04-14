import type { Metadata } from "next";
import { Inter } from "next/font/google";

// import "./globals.css"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "ShapeS Library",
  description: "ShapeS component library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans bg-sidebar overflow-hidden antialiased [--header-h:52px] xl:[--header-h:64px]`}
      >
        {children}
      </body>
    </html>
  );
}
