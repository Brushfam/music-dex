import s from "@/app/[locale]/(private)/profile/_components/settings/wallets/Wallets.module.scss";
import Image from "next/image";

export function CreateInternalWallet(props: { createWallet: () => void }) {
  const handleCreate = async () => {
    props.createWallet();
  };

  return (
    <div className={s.walletList}>
      <p className={s.title}>Or automatically create a wallet</p>
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
