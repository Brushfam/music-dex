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
      {/*Meta Pixel Code*/}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1443132846397662');
            fbq('track', 'PageView');`}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1443132846397662&ev=PageView&noscript=1"
          alt={"facebook"}
        />
      </noscript>
      {/*End Meta Pixel Code*/}
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
