import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.scss";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Header } from "@/components/Header/Header";
import { Toaster } from "sonner";
import { StarknetProvider } from "@/providers/StarknetProvider";
import Script from "next/script";
import { Footer } from "@/components/Footer/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MusicDex",
  description: "Invest in Music Royalties and Shape the Future of Music",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

function RootHeader() {
  return (
    <head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-E7NY2W59JZ"
      />

      <Script id="google-analytics">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DRRFYE53MC');
          `}
      </Script>
    </head>
  );
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = useMessages();
  return (
    <html lang={locale}>
      <RootHeader />
      <body className={inter.className} suppressHydrationWarning={true}>
        <StarknetProvider>
          <NextIntlClientProvider messages={messages}>
            <Toaster richColors />
            <Header />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </StarknetProvider>
      </body>
    </html>
  );
}
