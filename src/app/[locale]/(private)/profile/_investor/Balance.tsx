import s from "@/app/[locale]/(private)/profile/Profile.module.scss";
import { useWallet } from "@/providers/SolanaProvider";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { parseWalletListResponse } from "@/services/helpers";
import { getUserWallets } from "@/services/users/investors/wallets";
import { Wallet } from "@/types/types";
import { useAccount, useConnect } from "@starknet-react/core";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "../../_components/LoadingSpinner";
import { ProfileHeader } from "../../_components/ProfileHeader/ProfileHeader";
import { BalanceTable } from "./balance/BalanceTable";
import { HeaderButtons } from "./balance/HeaderButtons";
import Popups from "./balance/Popups";
import { WalletList } from "./profile/wallets/WalletList";

export const Balance = () => {
  const [loading, setLoading] = useState(false);
  const t = useTranslations("ProfileInvestor.Balance");
  const [currentTab, setCurrentTab] = useState("balance");
  const { connectWallet, account } = useWallet();
  const router = useRouter();
  const [connectedWallets, setConnectedWallets] = useState<Wallet[]>([]);
  const [primaryWallet, setPrimaryWallet] = useState("");
  console.log(account);

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
  }, [router, t]);

  const { connect, connectors } = useConnect();
  const { address } = useAccount();
  useEffect(() => {
    const wallet = connectedWallets.find(
      (wallet) => wallet.address === primaryWallet
    );
    if (!wallet) {
      return;
    }
    let name = wallet.name;
    try {
      name = JSON.parse(wallet.name);
    } catch (e) {}
    if (name === "Solana") {
      connectWallet();
    } else {
      connectors.some((connector) => {
        if (connector.available()) {
          if (connector.name === name) {
            connect({ connector });
            return true;
          }
        }
      });
    }
  }, [connectedWallets, connectors, primaryWallet]);

  return (
    <div className={s.subpageWrapper}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div className={s.subpageWrapper_tabs}>
          <div
            onClick={() => {
              setCurrentTab("balance");
            }}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <p
              className={`${s.pageTitle}  ${currentTab !== "balance" ? s.active : ""}`}
            >
              {t("title")}
            </p>
          </div>
          <div
            onClick={() => {
              setCurrentTab("wallets");
            }}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <p
              className={`${s.pageTitle} ${currentTab !== "wallets" ? s.active : ""}`}
            >
              {t("wallets")}
            </p>
          </div>
        </div>
        <ProfileHeader />
      </div>
      {loading ? (
        <LoadingSpinner fullHeight={true} />
      ) : currentTab === "balance" ? (
        <div className={s.contentWrapper}>
          <HeaderButtons />
          <BalanceTable />
          <Popups />
        </div>
      ) : (
        <div className={s.subpage}>
          <WalletList
            primaryWallet={primaryWallet}
            setPrimaryWallet={setPrimaryWallet}
          />
        </div>
      )}
    </div>
  );
};
