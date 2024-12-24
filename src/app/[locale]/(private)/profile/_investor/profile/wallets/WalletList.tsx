"use client";

import { LoadingSpinner } from "@/app/[locale]/(private)/_components/LoadingSpinner";
import { ConnectWallet } from "@/app/[locale]/(private)/profile/_investor/profile/wallets/ConnectWallet";
import { ConnectedWallets } from "@/app/[locale]/(private)/profile/_investor/profile/wallets/ConnectedWallets";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { parseWalletListResponse } from "@/services/helpers";
import {
  deleteWallet,
  getUserWallets,
  updatePrimaryWallet,
} from "@/services/users/investors/wallets";
import { Wallet } from "@/types/types";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import s from "../wallets/Wallets.module.scss";

export function WalletList({
  primaryWallet,
  setPrimaryWallet,
  connectedWallets,
  setConnectedWallets,
}: {
  primaryWallet: string;
  setPrimaryWallet: Dispatch<SetStateAction<string>>;
  connectedWallets: any;
  setConnectedWallets: any;
}) {
  const t = useTranslations("ProfileInvestor.Profile");
  const router = useRouter();
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
  }, [router, setPrimaryWallet, t, setConnectedWallets]);

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

  const handleDeleteWallet = async (wallet: Wallet) => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        deleteWallet(token, wallet)
          .then(() => {
            setConnectedWallets((prev: any) =>
              prev.filter((w: any) => w.address !== wallet.address)
            );
          })
          .catch((error) => {
            console.error("Failed to set primary wallet:", error);
          });
      } else {
        router.replace("/en/auth/login?expired-session=true");
      }
    });
  };

  return loading ? (
    <LoadingSpinner fullHeight={true} />
  ) : (
    <div className={s.walletsWrapper}>
      <ConnectedWallets
        wallets={connectedWallets}
        primaryWallet={primaryWallet}
        updatePrimaryWallet={handleUpdatePrimaryWallet}
        deleteWallet={handleDeleteWallet}
      />
      <ConnectWallet
        connectedWallets={connectedWallets}
        setConnectedWallets={setConnectedWallets}
        setPrimaryWallet={setPrimaryWallet}
      />
    </div>
  );
}
