import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "AKPÁKA — Handcrafted Luxury Shoes | Port Harcourt, Nigeria",
  description: "New in handcrafted leather shoes from the Akpaka atelier. Oxfords, loafers, boots and wedding shoes, made to order in Port Harcourt with Italian calfskin and Goodyear welt construction. Free delivery over ₦75,000.",
  keywords: ["AkpakaNG", "bespoke shoes", "luxury footwear", "Nigeria", "handcrafted", "leather shoes", "Port Harcourt", "Goodyear welt", "patina", "Oxford", "loafer", "Chelsea boot"],
  icons: { icon: "/logo.png" },
  openGraph: {
    title: "AkpakaNG — Where Leather Meets Excellence",
    description: "Handcrafted luxury shoes from Port Harcourt, Nigeria. Bespoke Oxfords, loafers, boots, and wedding shoes by master artisan Prince Sunday Achase.",
    type: "website",
    url: "https://akpaka.ng",
    siteName: "AkpakaNG",
  },
  twitter: {
    card: "summary_large_image",
    title: "AkpakaNG — Where Leather Meets Excellence",
    description: "Handcrafted luxury shoes from Port Harcourt, Nigeria.",
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
          logo: "https://akpaka.ng/logo.png",
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
          href="/images/akpaka-hero-campaign.jpg"
          type="image/jpeg"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd} />
      </head>
      <body className="antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
