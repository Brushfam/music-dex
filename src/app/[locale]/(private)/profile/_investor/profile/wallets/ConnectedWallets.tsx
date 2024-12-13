import { formatBlockchainAddress } from "@/services/helpers";
import { Wallet } from "@/types/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import s from "./Wallets.module.scss";

export function ConnectedWallets(props: {
  wallets: Wallet[];
  primaryWallet: string;
  updatePrimaryWallet: (newPrimaryWallet: Wallet) => Promise<void>;
}) {
  const t = useTranslations("ProfileInvestor.Profile");
  if (props.wallets.length === 0) {
    return null;
  }

  const vocabulary: { [key: string]: string } = {
    "Argent X": "/logos/Argent.png",
    Braavos: "/logos/Braavos.svg",
  };

  function getImagePath(input: string): string {
    const sanitizedInput = input.replace(/"/g, "");

    if (vocabulary.hasOwnProperty(sanitizedInput)) {
      return vocabulary[sanitizedInput];
    } else {
      return "/logos/solana.png";
    }
  }

  function isPrimary(wallet: Wallet): boolean {
    if (props.primaryWallet === wallet.name) {
      return true;
    }
    return wallet.address === props.primaryWallet;
  }

  function getWalletName(name: string) {
    return name.replace(/"/g, "");
  }
  return (
    <div className={s.walletList}>
      <p className={s.title}>{t("connected_wallets")}</p>
      {props.wallets.map((wallet, index) => (
        <div
          key={index.toString()}
          className={isPrimary(wallet) ? s.primaryWalletRow : s.baseWalletRow}
          onClick={() =>
            wallet.address !== props.primaryWallet &&
            props.updatePrimaryWallet(wallet)
          }
        >
          <Image
            src={getImagePath(wallet.name)}
            alt={"wallet logo"}
            width={36}
            height={36}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p className={s.walletName}> {getWalletName(wallet.name)}</p>
            {wallet.name !== "internal" ? (
              <p className={s.walletAddress}>
                {formatBlockchainAddress(wallet.address)}
              </p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
