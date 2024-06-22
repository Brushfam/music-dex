import s from "./Profile.module.scss";
import { SettingsTabs } from "@/app/[locale]/(private)/profile/_components/settings/SettingsTabs";
import {WalletList} from "@/app/[locale]/(private)/profile/_components/settings/wallets/WalletList";

export default function Settings() {
  return (
    <div className={s.subpageWrapper}>
      <p className={s.pageTitle}>Profile</p>
      <div className={s.subpage}>
        <SettingsTabs />
          <WalletList/>
      </div>
    </div>
  );
}
