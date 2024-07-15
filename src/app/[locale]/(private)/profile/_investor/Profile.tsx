"use client";

import { ProfileTabs } from "@/app/[locale]/(private)/profile/_investor/profile/ProfileTabs";
import { WalletList } from "@/app/[locale]/(private)/profile/_investor/profile/wallets/WalletList";
import { useTranslations } from "next-intl";
import { PageWrapper } from "../PageWrapper";
import { useState } from "react";
import { Info } from "@/app/[locale]/(private)/profile/_investor/profile/info/Info";

export default function Profile() {
  const t = useTranslations("ProfileInvestor.Profile");
  const [currentTab, setCurrentTab] = useState("info");

  return (
    <PageWrapper title={t("title")} height={"full"} loading={false}>
      <ProfileTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab === "info" ? <Info /> : <WalletList />}
    </PageWrapper>
  );
}
