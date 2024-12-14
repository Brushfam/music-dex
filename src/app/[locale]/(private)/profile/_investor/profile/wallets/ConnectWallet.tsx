"use client";

import { CreateSolanaWallet } from "@/app/[locale]/(private)/profile/_investor/profile/wallets/CreateSolanaWallet";
import { useWallet } from "@/providers/SolanaProvider";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { addUserWallet } from "@/services/users/investors/wallets";
import { Wallet } from "@/types/types";
import {
  Connector,
  useAccount,
  useConnect,
  useDisconnect,
} from "@starknet-react/core";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import s from "./Wallets.module.scss";

export function ConnectWallet({
  connectedWallets,
  setConnectedWallets,
  setPrimaryWallet,
}: {
  connectedWallets: Wallet[];
  setConnectedWallets: Dispatch<SetStateAction<Wallet[]>>;
  setPrimaryWallet: Dispatch<SetStateAction<string>>;
}) {
  const t = useTranslations("ProfileInvestor.Profile");
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { setIsWalConnected } = useWallet();
  const { connect, connectors } = useConnect();
  const [mounted, setMounted] = useState(false);
  const [prevAddress, setPrevAddress] = useState("");
  const [walletName, setWalletName] = useState("");

  const vocabulary: { [key: string]: any } = {
    "Argent X": { img: "/logos/Argent.png", link: "https://www.argent.xyz/" },
    Braavos: { img: "/logos/Braavos.svg", link: "https://www.braavos.app/" },
  };
  function getWalletInfo(input: string): any {
    const sanitizedInput = input.replace(/"/g, "");

    if (vocabulary.hasOwnProperty(sanitizedInput)) {
      return vocabulary[sanitizedInput];
    } else {
      return "/logos/solana.png";
    }
  }

  const starknetWallets = connectors.filter((connector) => {
    const connectorName = connector.name.replace(/"/g, "");
    return !connectedWallets.find(
      (wallet) => wallet.name.replace(/"/g, "") === connectorName
    );
  });

  useEffect(() => {
    setMounted(true);
    if (address && address !== prevAddress) {
      setPrevAddress(address);

      const walletExists = connectedWallets.find(
        (wallet) =>
          wallet.address === address &&
          wallet.name.replace(/"/g, "") !== "Solana"
      );
      if (walletExists) return;

      firebaseAuth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const token = await user.getIdToken();
            await addUserWallet(token, address, walletName);

            setConnectedWallets((prev) => [
              { name: walletName, address },
              ...prev,
            ]);
            console.log("object");
            setIsWalConnected(false);
            setPrimaryWallet(address);
            setWalletName("");
            toast.success(t("Toast.wallet_connected"));
          } catch (error) {
            console.error(error);
            toast.error(t("Toast.error_adding_wallet"));
          } finally {
            disconnect();
          }
        } else {
          disconnect();
          router.replace("/en/auth/login?expired-session=true");
        }
      });
    }
  }, [
    address,
    connectedWallets,
    disconnect,
    prevAddress,
    setConnectedWallets,
    setPrimaryWallet,
    setIsWalConnected,
    t,
    walletName,
    router,
  ]);

  const connectWalletIfNew = (name: string, connector: Connector) => {
    connectedWallets.map((w) => {
      if (w.name === name) {
        toast.info(t("Toast.address_already_exist"));
        return;
      }
    });

    setWalletName(name);
    connect({ connector });
  };

  const WalletIcon = ({ path }: { path: string }) => (
    <Image src={path} alt="Wallet logo" width={36} height={36} />
  );

  return (
    (!connectedWallets.find(
      (item) => item.name.replace(/"/g, "") === "Solana"
    ) ||
      starknetWallets.length > 0) && (
      <div className={s.walletList}>
        <p className={s.title}>{t("connect_wallet")}</p>
        {mounted &&
          starknetWallets.map((connector: Connector, index) => {
            const available = connector.available();
            const name = connector.name;
            const { img, link } = getWalletInfo(name);
            return available ? (
              <div
                key={index}
                onClick={() => connectWalletIfNew(name, connector)}
                className={s.baseWalletRow}
              >
                <WalletIcon path={img} />
                <p className={s.walletName}>{name}</p>
              </div>
            ) : (
              <a
                key={index}
                href={link}
                target="_blank"
                className={s.baseWalletRow}
              >
                <WalletIcon path={img} />
                <p className={s.walletName}>{name}</p>
              </a>
            );
          })}

        {!connectedWallets.find(
          (item) => item.name.replace(/"/g, "") === "Solana"
        ) && (
          <CreateSolanaWallet
            setConnectedWallets={setConnectedWallets}
            connectedWallets={connectedWallets}
            setPrimaryWallet={setPrimaryWallet}
          />
        )}
      </div>
    )
  );
}
