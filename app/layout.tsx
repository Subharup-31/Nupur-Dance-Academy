import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dance Class Learning Log | Nupur Dance Academy",
  description: "Track your dance journey. Log what you learn after every class and keep your momentum alive.",
  keywords: ["dance", "learning", "log", "progress", "classes", "Nupur Dance Academy"],
  authors: [{ name: "Nupur Dance Academy" }],
  openGraph: {
    title: "Dance Class Learning Log",
    description: "A simple, elegant way to log your daily dance progress.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
