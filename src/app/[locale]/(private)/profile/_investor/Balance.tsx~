import s from "@/app/[locale]/(private)/profile/Profile.module.scss";
import { useWallet } from "@/providers/SolanaProvider";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { parseWalletListResponse } from "@/services/helpers";
import { getBalance } from "@/services/users/investors/investors";
import { getUserWallets } from "@/services/users/investors/wallets";
import { BalanceType, Wallet } from "@/types/types";
import { useConnect } from "@starknet-react/core";
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
  const [loading, setLoading] = useState(true);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const t = useTranslations("ProfileInvestor.Balance");
  const [currentTab, setCurrentTab] = useState("balance");
  const { connectWallet, account, setIsWalConnected } = useWallet();
  const router = useRouter();
  const [connectedWallets, setConnectedWallets] = useState<Wallet[]>([]);
  const [primaryWallet, setPrimaryWallet] = useState("");
  const [balanceList, setBalanceList] = useState<BalanceType[]>([]);
  console.log(balanceList);
  let mainBalance = balanceList.reduce((prev, item) => {
    return prev + parseFloat(item.balance) * parseFloat(item.price);
  }, 0);
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        getBalance(token)
          .then((res) => {
            setBalanceList(res.data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoadingBalance(false);
          });
      } else {
        router.replace("/en/auth/login?expired-session=true");
      }
    });
  }, [router]);

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
      setIsWalConnected(false);
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

        <div className={s.profile}>
          <div className={s.balance}>
            <h2>Balance:</h2>
            <p>{mainBalance}$</p>
          </div>
          <ProfileHeader />
        </div>
      </div>
      {loading || loadingBalance ? (
        <LoadingSpinner fullHeight={true} />
      ) : currentTab === "balance" ? (
        <div className={s.contentWrapper}>
          <HeaderButtons balanceList={balanceList} />
          <BalanceTable balanceList={balanceList} />
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
