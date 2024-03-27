import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.scss";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { UserProvider } from "@/context/UserContext";
import { Header } from "@/components/Header/Header";
import { Toaster } from "sonner";
import Script from "next/script";

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

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = useMessages();
  return (
    <html lang={locale}>
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
      <UserProvider>
        <body className={inter.className} suppressHydrationWarning={true}>
          <NextIntlClientProvider messages={messages}>
            <Toaster richColors />
            <Header />
            {children}
          </NextIntlClientProvider>
        </body>
      </UserProvider>
    </html>
  );
}
