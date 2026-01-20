import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { justRelaxData } from "@/lib/just-relax-data";
import { SITE_URL, defaultLocale } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: justRelaxData.seo.title,
    template: "%s | Just Relax",
  },
  description: justRelaxData.seo.description,
  keywords: justRelaxData.seo.keywords,
  openGraph: {
    title: justRelaxData.seo.title,
    description: justRelaxData.seo.description,
    url: "/",
    siteName: justRelaxData.name,
    locale: defaultLocale,
    type: "website",
    images: justRelaxData.heroImage
      ? [
          {
            url: justRelaxData.heroImage,
            width: 1600,
            height: 900,
            alt: justRelaxData.seo.title,
          },
        ]
      : [],
  },
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
      fr: "/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const phoneHref = justRelaxData.contact.phoneMain
    ? `tel:${justRelaxData.contact.phoneMain.replace(/\s+/g, "")}`
    : "#";

  const mapHref = justRelaxData.contact.address.mapUrl || "#";

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-50`}
      >
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
              <Link href="/" className="flex items-baseline gap-2">
                <span className="text-base font-semibold tracking-tight uppercase text-amber-400 sm:text-lg">
                  {justRelaxData.name}
                </span>
                <span className="hidden text-xs text-slate-300 sm:inline">
                  {justRelaxData.tagline}
                </span>
              </Link>
              <nav className="flex items-center gap-4 text-xs font-medium sm:text-sm">
                <Link
                  href="/menu"
                  className="text-slate-200 transition-colors hover:text-amber-300"
                >
                  Menu
                </Link>
                <Link
                  href="/galerie"
                  className="text-slate-200 transition-colors hover:text-amber-300"
                >
                  Galerie
                </Link>
                <Link
                  href="/acces-horaires"
                  className="hidden text-slate-200 transition-colors hover:text-amber-300 sm:inline"
                >
                  Accès &amp; horaires
                </Link>
                <Link
                  href="/contact"
                  className="hidden text-slate-200 transition-colors hover:text-amber-300 sm:inline"
                >
                  Contact
                </Link>
                <a
                  href={phoneHref}
                  className="rounded-full bg-amber-400 px-3 py-1.5 text-xs font-semibold text-slate-950 shadow-sm ring-1 ring-amber-300/70 transition hover:bg-amber-300 hover:ring-amber-200 sm:px-4 sm:text-sm"
                >
                  Appeler
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-white/10 bg-black/60">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
              <div>
                <p className="text-sm font-semibold text-slate-100">
                  {justRelaxData.name}
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  {justRelaxData.contact.address.line1}
                  <br />
                  {justRelaxData.contact.address.postalCode}{" "}
                  {justRelaxData.contact.address.city}
                </p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-300">
                  {justRelaxData.contact.phoneMain && (
                    <a
                      href={phoneHref}
                      className="underline-offset-2 hover:underline"
                    >
                      Tél : {justRelaxData.contact.phoneMain}
                    </a>
                  )}
                  {justRelaxData.contact.email && (
                    <a
                      href={`mailto:${justRelaxData.contact.email}`}
                      className="underline-offset-2 hover:underline"
                    >
                      {justRelaxData.contact.email}
                    </a>
                  )}
                  {mapHref !== "#" && (
                    <a
                      href={mapHref}
                      target="_blank"
                      rel="noreferrer"
                      className="underline-offset-2 hover:underline"
                    >
                      Itinéraire
                    </a>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 text-xs text-slate-400 sm:text-right">
                <p>
                  &copy; {new Date().getFullYear()} {justRelaxData.name}. Tous
                  droits réservés.
                </p>
                {justRelaxData.legal.companyName && (
                  <p>
                    Raison sociale : {justRelaxData.legal.companyName} – N°
                    d&apos;enregistrement{" "}
                    {justRelaxData.legal.registrationNumber}
                  </p>
                )}
                <p className="text-[11px] text-slate-500">
                  Site vitrine recréé sur mesure avec Next.js, TypeScript &amp;
                  Tailwind CSS.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
