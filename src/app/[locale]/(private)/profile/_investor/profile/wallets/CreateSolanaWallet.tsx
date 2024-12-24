"use client";
import s from "@/app/[locale]/(private)/profile/_investor/profile/wallets/Wallets.module.scss";
import { useWallet } from "@/providers/SolanaProvider";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { addUserWallet } from "@/services/users/investors/wallets";
import { PublicKey } from "@solana/web3.js";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { disconnect } from "process";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function CreateSolanaWallet({
  connectedWallets,
  setPrimaryWallet,
  setConnectedWallets,
}: {
  connectedWallets: any;
  setPrimaryWallet: any;
  setConnectedWallets: any;
}) {
  const t = useTranslations("ProfileInvestor.Profile");

  const { account, connectWallet, isWalletConnected } = useWallet();

  const [prevAddress, setPrevAddress] = useState<PublicKey | string>("");

  const walletName = "Solana";
  const router = useRouter();

  useEffect(() => {
    // setMounted(true);

    if (!account) {
      return;
    }

    const wallet = connectedWallets.find(
      (wall: any) =>
        wall.address === account!.toString() && wall.name === walletName
    );
    if (wallet) {
      return;
    }
    if (account && account !== prevAddress) {
      setPrevAddress(account);

      firebaseAuth.onAuthStateChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken();
          addUserWallet(token, account, walletName)
            .then(() => {
              let newArray = [...connectedWallets];

              newArray.unshift({
                address: account!.toString(),
                name: walletName,
              });
              console.log(newArray);
              setConnectedWallets(newArray);

              setPrimaryWallet(walletName);
              toast.success(t("Toast.wallet_connected"));
            })
            .catch((error) => {
              console.log(error);
              toast.error(t("Toast.error_adding_wallet"));
            });
        } else {
          disconnect();
          router.replace("/en/auth/login?expired-session=true");
        }
      });
    }
  }, [
    account,
    connectedWallets,
    prevAddress,
    router,
    setConnectedWallets,
    setPrimaryWallet,
    t,
  ]);

  return isWalletConnected ? (
    <div className={s.baseWalletRow} onClick={connectWallet}>
      <Image
        src={"/logos/solana.png"}
        alt={"Wallet logo"}
        width={36}
        height={36}
      />
      <p className={s.walletName}>Solana</p>
    </div>
  ) : (
    <a
      href={"https://phantom.app"}
      target={"_blank"}
      className={s.baseWalletRow}
    >
      <Image
        src={"/logos/solana.png"}
        alt={"Wallet logo"}
        width={36}
        height={36}
      />

      <p className={s.walletName}>Solana</p>
    </a>
  );
}
