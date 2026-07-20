import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "AkpakaNG — Where Leather Meets Excellence | Bespoke Luxury Shoes Nigeria",
  description: "Handcrafted luxury shoes from Port Harcourt, Nigeria. Bespoke Oxfords, loafers, boots, and wedding shoes crafted by master artisan Prince Sunday Achase. Made-to-order with Italian calfskin and Goodyear welt construction.",
  keywords: ["AkpakaNG", "bespoke shoes", "luxury footwear", "Nigeria", "handcrafted", "leather shoes", "Port Harcourt", "Goodyear welt", "patina", "Oxford", "loafer", "Chelsea boot"],
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "AkpakaNG — Where Leather Meets Excellence",
    description: "Handcrafted luxury shoes from Port Harcourt, Nigeria. Bespoke Oxfords, loafers, boots, and wedding shoes by master artisan Prince Sunday Achase.",
    type: "website",
    url: "https://akpaka.ng",
    siteName: "AkpakaNG",
    images: [{ url: "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=1200&q=80", width: 1200, height: 630, alt: "AkpakaNG Handcrafted Luxury Shoes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AkpakaNG — Where Leather Meets Excellence",
    description: "Handcrafted luxury shoes from Port Harcourt, Nigeria.",
    images: ["https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=1200&q=80"],
  },
  metadataBase: new URL("https://akpaka.ng"),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://akpaka.ng/#organization",
          name: "Akpaka Shoe Enterprise",
          alternateName: "AkpakaNG",
          url: "https://akpaka.ng",
          logo: "https://akpaka.ng/logo.svg",
          description: "Bespoke luxury shoemaking brand based in Port Harcourt, Nigeria.",
          founder: {
            "@type": "Person",
            name: "Prince Sunday Achase",
          },
          address: {
            "@type": "PostalAddress",
            streetAddress: "No 1 Doxa Road",
            addressLocality: "Port Harcourt",
            addressRegion: "Rivers State",
            addressCountry: "NG",
          },
          telephone: "+2348180474183",
          sameAs: [
            "https://instagram.com/akpaka.ng",
            "https://facebook.com/akpakaboy",
            "https://tiktok.com/@akpaka.ng",
          ],
        },
        {
          "@type": "WebSite",
          "@id": "https://akpaka.ng/#website",
          url: "https://akpaka.ng",
          name: "AkpakaNG",
          publisher: { "@id": "https://akpaka.ng/#organization" },
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://akpaka.ng/#breadcrumb",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://akpaka.ng" },
            { "@type": "ListItem", position: 2, name: "Collections", item: "https://akpaka.ng/collections" },
            { "@type": "ListItem", position: 3, name: "About", item: "https://akpaka.ng/about" },
            { "@type": "ListItem", position: 4, name: "Craftsmanship", item: "https://akpaka.ng/craftsmanship" },
          ],
        },
      ],
    }),
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=1600&q=75"
          type="image/jpeg"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd} />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
