"use client";

import { PageWrapper } from "@/app/[locale]/(private)/profile/PageWrapper";
import { FaqList } from "@/app/[locale]/(private)/profile/_artist/faq/FaqList";
import { useTranslations } from "next-intl";
import s from "../_artist/faq/FaqList.module.scss";

export function FAQ() {
  const t = useTranslations("ProfileArtist.FAQ");

  return (
    <PageWrapper title={t("title")} height={"auto"} loading={false}>
      <p className={s.subpageTitle}>{t("list_title")}</p>
      <FaqList />
    </PageWrapper>
  );
}
