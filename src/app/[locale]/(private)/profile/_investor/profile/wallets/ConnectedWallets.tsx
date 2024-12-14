import { useWallet } from "@/providers/SolanaProvider";
import { formatBlockchainAddress } from "@/services/helpers";
import { Wallet } from "@/types/types";
import { useConnect } from "@starknet-react/core";
import { useTranslations } from "next-intl";
import Image from "next/image";
import s from "./Wallets.module.scss";

export function ConnectedWallets(props: {
  wallets: Wallet[];
  primaryWallet: string;
  updatePrimaryWallet: (newPrimaryWallet: Wallet) => Promise<void>;
  deleteWallet: (wallet: Wallet) => Promise<void>;
}) {
  const t = useTranslations("ProfileInvestor.Profile");
  const { connect, connectors } = useConnect();
  const { disconnectWallet } = useWallet();
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
          <div
            style={{
              marginLeft: "auto",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            {isPrimary(wallet) ? (
              <input type="radio" onChange={() => null} checked={true} />
            ) : (
              <div
                onClick={(e) => {
                  e.stopPropagation();

                  const connector = connectors?.find((connector) => {
                    if (connector.available()) {
                      return connect.name === wallet.name;
                    }
                  });
                  const name = wallet.name.replace(/"/g, "");

                  props
                    .deleteWallet({
                      name,
                      address: wallet.address,
                    })
                    .then(() => {
                      if (wallet.name === "Solana") {
                        disconnectWallet();
                      } else {
                        connector?.disconnect();
                      }
                    });
                }}
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {t("delete")}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
