"use client";

import { LoadingSpinner } from "@/app/[locale]/(private)/_components/LoadingSpinner";
import { ConnectWallet } from "@/app/[locale]/(private)/profile/_investor/profile/wallets/ConnectWallet";
import { ConnectedWallets } from "@/app/[locale]/(private)/profile/_investor/profile/wallets/ConnectedWallets";
import { CreateInternalWallet } from "@/app/[locale]/(private)/profile/_investor/profile/wallets/CreateInternalWallet";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { parseWalletListResponse } from "@/services/helpers";
import {
  createInternalWallet,
  getUserWallets,
  updatePrimaryWallet,
} from "@/services/users/investors/wallets";
import { Wallet } from "@/types/types";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import s from "../wallets/Wallets.module.scss";

export function WalletList() {
  const t = useTranslations("ProfileInvestor.Profile");
  const router = useRouter();
  const [connectedWallets, setConnectedWallets] = useState<Wallet[]>([]);
  const [hasInternalWallet, setHasInternalWallet] = useState(false);
  const [primaryWallet, setPrimaryWallet] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function setUserWallets() {
      firebaseAuth.onAuthStateChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken();
          const response = await getUserWallets(token);
          const connectedWallets = response.data.connectedWallets
            ? parseWalletListResponse(response.data.connectedWallets)
            : [];
          setConnectedWallets(connectedWallets);

          // Check if any wallet has the type "internal"
          const internalWalletExists = connectedWallets.some(
            (wallet: Wallet) => wallet.name === "internal"
          );
          setHasInternalWallet(internalWalletExists);

          // Setting primary wallet
          const primary = response.data.primaryWallet;
          if (primary) {
            setPrimaryWallet(primary);
          }
          setLoading(false);
        } else {
          router.replace("/en/auth/login?expired-session=true");
        }
      });
    }

    async function fetchWallets() {
      try {
        setUserWallets();
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
          router.replace("/en/auth/login?expired-session=true");
        } else {
          console.error("Error fetching wallets:", error);
          toast.error(t("Toast.error_updating_wallets"));
        }
      }
    }

    fetchWallets();
  }, [router, t]);

  const handleUpdatePrimaryWallet = async (newPrimaryWallet: Wallet) => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        updatePrimaryWallet(token, newPrimaryWallet.address)
          .then(() => {
            setPrimaryWallet(newPrimaryWallet.address);
          })
          .catch((error) => {
            console.error("Failed to set primary wallet:", error);
          });
      } else {
        router.replace("/en/auth/login?expired-session=true");
      }
    });
  };

  const handleCreateInternalWallet = async () => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        createInternalWallet(token)
          .then(() => {
            setHasInternalWallet(true);
            let newArray = [...connectedWallets];
            newArray.unshift({
              name: "internal",
              address: "internal",
            });
            setConnectedWallets(newArray);
            setPrimaryWallet("internal");
            handleUpdatePrimaryWallet({
              name: "internal",
              address: "internal",
            });
            toast.success(t("Toast.internal_created"));
          })
          .catch((error) => {
            console.log(error);
            toast.error(t("Toast.internal_created"));
          });
      } else {
        router.replace("/en/auth/login?expired-session=true");
      }
    });
  };

  function showConnectWallet(): boolean {
    return connectedWallets.length <= 2;
  }

  return loading ? (
    <LoadingSpinner fullHeight={true} />
  ) : (
    <div className={s.walletsWrapper}>
      <ConnectedWallets
        wallets={connectedWallets}
        primaryWallet={primaryWallet}
        updatePrimaryWallet={handleUpdatePrimaryWallet}
      />
      {showConnectWallet() ? (
        <ConnectWallet
          connectedWallets={connectedWallets}
          setConnectedWallets={setConnectedWallets}
          setPrimaryWallet={setPrimaryWallet}
        />
      ) : null}
      {!hasInternalWallet && (
        <CreateInternalWallet createWallet={handleCreateInternalWallet} />
      )}
    </div>
  );
}
