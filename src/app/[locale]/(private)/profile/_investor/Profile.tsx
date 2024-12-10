"use client";
import { ProfileTabs } from "@/app/[locale]/(private)/profile/_investor/profile/ProfileTabs";
import { Info } from "@/app/[locale]/(private)/profile/_investor/profile/info/Info";
import { useTranslations } from "next-intl";
import { PageWrapper } from "../PageWrapper";

export default function Profile() {
  const t = useTranslations("ProfileInvestor.Profile");
  return (
    <PageWrapper title={t("title")} height={"full"} loading={false}>
      <ProfileTabs />
      <Info />
    </PageWrapper>
  );
}
