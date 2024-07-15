"use client";

import s from "./ProfileTabs.module.scss";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

export function ProfileTabs(props: {
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
}) {
  const t = useTranslations("ProfileInvestor.Profile");

  function getCurrentStyle(tab: string) {
    return props.currentTab === tab
      ? { color: "rgb(246, 96, 31)" }
      : { color: "rgba(255, 255, 255, 0.5)", cursor: "pointer" };
  }

  return (
    <div className={s.tabsList}>
      <p
        style={getCurrentStyle("info")}
        onClick={() => {
          props.setCurrentTab("info");
        }}
      >
        {t("tab1")}
      </p>
      <p
        style={getCurrentStyle("wallets")}
        onClick={() => {
          props.setCurrentTab("wallets");
        }}
      >
        {t("tab2")}
      </p>
    </div>
  );
}
