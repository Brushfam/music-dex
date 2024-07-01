"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { OverviewRow } from "@/app/[locale]/(private)/profile/_artist/overview/OverviewRow";
import s from "@/app/[locale]/(private)/profile/Profile.module.scss";
import { ProfileHeader } from "@/app/[locale]/(private)/profile/_components/ProfileHeader/ProfileHeader";
import { SecondBlock } from "@/app/[locale]/(private)/profile/_artist/overview/SecondBlock";

export function Overview() {
  const t = useTranslations("ProfileArtist.Overview");

  return (
    <div className={s.subpageWrapper}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <p className={s.pageTitle}>{t("title")}</p>
        <ProfileHeader />
      </div>
      <div className={s.contentWrapper}>
        <OverviewRow />
        <SecondBlock />
      </div>
    </div>
  );
}
