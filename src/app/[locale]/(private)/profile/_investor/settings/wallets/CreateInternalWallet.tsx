import s from "@/app/[locale]/(private)/profile/_investor/settings/wallets/Wallets.module.scss";
import Image from "next/image";
import {useTranslations} from "next-intl";

export function CreateInternalWallet(props: { createWallet: () => void }) {
    const t = useTranslations("ProfileInvestor.Settings");
  const handleCreate = async () => {
    props.createWallet();
  };

  return (
    <div className={s.walletList}>
      <p className={s.title}>{t("create_internal_wallet")}</p>
      <div className={s.baseWalletRow} onClick={handleCreate}>
        <Image
          src={"/profile/icons/internal-wallet.png"}
          alt={"wallet logo"}
          width={36}
          height={36}
        />
        <p className={s.walletName}>Internal Wallet</p>
      </div>
    </div>
  );
}
