import { StarknetProvider } from "@/providers/StarknetProvider";
import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Inter } from "next/font/google";
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

export default function PrivateRootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = useMessages();
  return (
    <html lang={locale}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <NextIntlClientProvider messages={messages}>
          <StarknetProvider>
            <Toaster richColors />
            {children}
          </StarknetProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
