import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AkpakaNG — Where Leather Meets Excellence",
  description: "Handcrafted luxury shoes from Port Harcourt, Nigeria. Bespoke Oxfords, loafers, boots, and wedding shoes crafted by master artisan Prince Sunday Achase.",
  keywords: ["AkpakaNG", "bespoke shoes", "luxury footwear", "Nigeria", "handcrafted", "leather shoes", "Port Harcourt"],
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "AkpakaNG — Where Leather Meets Excellence",
    description: "Handcrafted luxury shoes from Port Harcourt, Nigeria.",
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
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
