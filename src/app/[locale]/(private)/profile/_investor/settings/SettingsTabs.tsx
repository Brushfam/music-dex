import s from "./Settings.module.scss";
import { useTranslations } from "next-intl";

export function SettingsTabs() {
  const t = useTranslations("ProfileInvestor.Settings");
  return (
    <div className={s.tabsList}>
      <p style={{ color: "rgba(255, 255, 255, 0.5)" }}>{t("tab1")}</p>
      <p style={{ color: "rgb(246, 96, 31)", cursor: "pointer" }}>
        {t("tab2")}
      </p>
    </div>
  );
}
