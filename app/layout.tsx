import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/layout/Cursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { company, siteConfig } from "@/content/company";
import { totalSites } from "@/content/sites";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";

/* Display face. The width axis is what gives headings their signage feel. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
});

/* Editorial counterpoint. Italic only — used for eyebrows and pull quotes. */
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

/* Search-snippet length (~155 characters). company.description is the long
   form, used in structured data where nothing truncates it. */
const description = `Fangrove Media owns ${totalSites} billboard, LED and bridge-panel sites across Lahore and runs its own flex print floor. Outdoor, DOOH, TV, radio and press since ${company.founded}.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${company.name} — Billboard & Outdoor Advertising in Lahore`,
    template: `%s · ${company.name}`,
  },
  description,
  applicationName: company.name,
  authors: [{ name: company.name, url: siteConfig.url }],
  creator: company.name,
  publisher: company.legalName,
  keywords: [
    "outdoor advertising Lahore",
    "billboard advertising Pakistan",
    "DOOH Pakistan",
    "digital out of home Lahore",
    "flex printing Lahore",
    "offset printing Lahore",
    "newspaper advertising Pakistan",
    "TV advertising Pakistan",
    "media buying Lahore",
    "advertising agency Lahore",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: company.name,
    locale: siteConfig.locale,
    title: `${company.name} — Billboard & Outdoor Advertising in Lahore`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, address: false, email: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-PK"
      className={`${archivo.variable} ${instrument.variable} ${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Scroll-reveal elements render at opacity 0 / translated until motion
            takes over. If JS never runs, this makes the whole page readable. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />

        <a
          href="#main"
          className="sr-only rounded-[var(--radius-md)] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-bg"
        >
          Skip to content
        </a>

        <SmoothScroll>
          <Cursor />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
