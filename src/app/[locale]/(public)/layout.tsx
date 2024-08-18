import { FooterController } from "@/components/Footer/FooterController";
import { Header } from "@/components/Header/Header";
import { StarknetProvider } from "@/providers/StarknetProvider";
import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import "../../globals.scss";

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

export default function PublicRootLayout({
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
            <FooterController />
          </NextIntlClientProvider>
        </StarknetProvider>
      </body>
    </html>
  );
}
