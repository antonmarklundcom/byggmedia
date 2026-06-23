import type { Metadata, Viewport } from "next";
import { Newsreader, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/config";
import { JsonLd, organizationLd } from "@/lib/jsonld";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BottomBar } from "@/components/BottomBar";
import { CookieBanner } from "@/components/CookieBanner";
import { LeadDialogProvider } from "@/components/LeadDialog";

// Self-hosted via next/font (no external font requests at runtime).
const display = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Byggmedia — marknadsföring för bygg- & hantverksföretag",
    template: "%s | Byggmedia",
  },
  description:
    "Byggmedia gör marknadsföring för bygg- och hantverksföretag i hela Sverige. Du är bäst på ditt hantverk — vi ser till att kunderna hittar dig. Kostnadsfri analys.",
  openGraph: {
    type: "website",
    locale: "sv_SE",
    siteName: "Byggmedia",
    url: site.url,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#19211e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={`${display.variable} ${sans.variable}`}>
      <body className="has-bottombar">
        <JsonLd data={organizationLd()} />
        <LeadDialogProvider>
          <SiteHeader />
          <main id="innehall">{children}</main>
          <SiteFooter />
          <BottomBar />
        </LeadDialogProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
