import { SettingsTabs } from "@/app/[locale]/(private)/profile/_investor/settings/SettingsTabs";
import { WalletList } from "@/app/[locale]/(private)/profile/_investor/settings/wallets/WalletList";
import { useTranslations } from "next-intl";
import { PageWrapper } from "../PageWrapper";

export default function Settings() {
  const t = useTranslations("ProfileInvestor.Settings");

  return (
    <PageWrapper title={t("title")} height={"full"} loading={false}>
      <SettingsTabs />
      <WalletList />
    </PageWrapper>
  );
}
