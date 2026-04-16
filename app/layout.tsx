import "./globals.css";

import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Fraunces, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Onboarding BOBBEE",
  description: "Portail d'onboarding BOBBEE, simple, chaleureux et base sur des donnees locales."
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF"
};

const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/liens-utiles", label: "Liens utiles" }
];

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body className={`${fraunces.variable} ${manrope.variable} min-h-screen text-hive-ink antialiased`}>
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-hive-line/80 bg-white">
            <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5 xl:px-10">
              <Link href="/" className="flex items-center gap-3 sm:gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-[1.25rem] bg-honey-400 text-lg font-bold text-hive-ink sm:h-14 sm:w-14 sm:text-xl">
                  B
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-honey-700 sm:text-[0.7rem]">
                    Portail d&apos;onboarding
                  </p>
                  <p className="font-display text-xl leading-none sm:text-[1.8rem]">BOBBEE</p>
                </div>
              </Link>

              <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-hive-ink sm:gap-4 sm:text-base">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-4 py-2 transition hover:bg-white hover:text-honey-700 sm:px-5 sm:py-2.5"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <main className="flex-1 py-5 sm:py-6">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
