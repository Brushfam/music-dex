"use client";

import { DesktopNavigation } from "@/app/[locale]/(public)/faq/_components/FaqNavigation/DesktopNavigation";
import { MobileNavigation } from "@/app/[locale]/(public)/faq/_components/FaqNavigation/MobileNavigation";
import { QuestionsColumn } from "@/app/[locale]/(public)/faq/_components/QuestionsColumn";
import s from "@/app/[locale]/(public)/faq/page.module.scss";
import { faqContentEN, faqContentUA } from "@/data/faq/faqContent";
import { faqNavigationEN, faqNavigationUA } from "@/data/faq/faqNavigation";
import { useLocale } from "use-intl";

export function FaqContent() {
  const currentLocale = useLocale();
  const isEN = currentLocale === "en";
  const [faqContent, faqNavigation, tabText] = isEN
    ? [faqContentEN, faqNavigationEN, "Content"]
    : [faqContentUA, faqNavigationUA, "Зміст"];

  return (
    <div className={s.faqContent}>
      <DesktopNavigation faqNavigation={faqNavigation} />
      <MobileNavigation faqNavigation={faqNavigation} tabText={tabText} />
      <QuestionsColumn faqContent={faqContent} faqNavigation={faqNavigation} />
    </div>
  );
}
