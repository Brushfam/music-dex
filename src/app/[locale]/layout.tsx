import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.scss";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { UserProvider } from "@/context/UserContext";
import { Header } from "@/components/Header/Header";
import { Toaster } from "sonner";
import {StarknetProvider} from "@/context/starknetContext";

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
      <body className={inter.className} suppressHydrationWarning={true}>
        <UserProvider>
          <StarknetProvider>
            <NextIntlClientProvider messages={messages}>
              <Toaster richColors />
              <Header />
              {children}
            </NextIntlClientProvider>
          </StarknetProvider>
        </UserProvider>
      </body>
    </html>
  );
}
