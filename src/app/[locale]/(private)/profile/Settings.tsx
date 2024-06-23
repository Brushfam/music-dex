import s from "./Profile.module.scss";
import { SettingsTabs } from "@/app/[locale]/(private)/profile/_components/settings/SettingsTabs";
import { WalletList } from "@/app/[locale]/(private)/profile/_components/settings/wallets/WalletList";
import { useTranslations } from "next-intl";

export default function Settings() {
  const t = useTranslations("ProfileInvestor.Settings");
  return (
    <div className={s.subpageWrapper}>
      <p className={s.pageTitle}>{t("title")}</p>
      <div className={s.subpage}>
        <SettingsTabs />
        <WalletList />
      </div>
    </div>
  );
}
