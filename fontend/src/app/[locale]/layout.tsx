import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import '../globals.css';
import type { Metadata } from "next";
//layout.tsx
export const metadata: Metadata = {
  title: "Odontis",
  description:
    "Odontis is an AI-powered dental imaging system that assists clinicians with fast, secure, and non-invasive X-ray predictions.",
  keywords: [
    "AI dental tool",
    "Dental X-ray AI",
    "Dental image classification",
    "AI diagnosis support",
  ],
};
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>

          <Script
            src="https://cdn.botpress.cloud/webchat/v3.6/inject.js"
            strategy="afterInteractive"
          />
          <Script
            src="https://files.bpcontent.cloud/2026/02/14/05/20260214054417-RRMVAXJX.js"
            strategy="afterInteractive"
          />

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
