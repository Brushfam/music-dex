"use client";

import { useTranslations } from "next-intl";
import s from "./ProfileTabs.module.scss";

export function ProfileTabs() {
  const t = useTranslations("ProfileInvestor.Profile");

  return (
    <div className={s.tabsList}>
      <p style={{ color: "rgb(246, 96, 31)}" }}>{t("tab1")}</p>
    </div>
  );
}
