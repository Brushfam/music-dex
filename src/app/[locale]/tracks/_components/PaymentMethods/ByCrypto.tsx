"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { unipassBuyTokens, wcBuyTokens } from "@/services/blockchain/ethersMethods";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { hasEnoughMATIC, hasEnoughUSDT } from "@/services/blockchain/serverMethods";
import { UseUser } from "@/context/UserContext";
import { useWeb3ModalProvider } from "@web3modal/ethers5/react";

export function ByCrypto(props: {
  user: string;
  tokensToPay: string;
  tokensToBuy: number;
  address: string;
  setLowBalanceModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const userContext = UseUser();
  const { walletProvider } = useWeb3ModalProvider();
  const t = useTranslations("SharesBlock.ByCrypto");
  const [loading, setLoading] = useState(false);

  async function handlePurchase() {
    const isUnipas = userContext.wallet === "Unipass";
    // with Unipass user can pay fee with USDT or with MATIC
    // with WalletConnect user need to pay fee with MATIC
    const enoughMATIC = await hasEnoughMATIC(props.user);
    let enoughBalance;
    if (isUnipas) {
      enoughBalance = await hasEnoughUSDT(
        props.user,
        props.tokensToPay,
        !enoughMATIC,
      );
    } else {
      const enoughUSDT = await hasEnoughUSDT(
        props.user,
        props.tokensToPay,
        false,
      );
      enoughBalance = enoughMATIC && enoughUSDT;
    }

    if (!enoughBalance) {
      props.setLowBalanceModal(true);
      setLoading(false);
      return;
    }

    toast.promise(
      isUnipas
        ? unipassBuyTokens(
            props.user,
            props.tokensToPay,
            props.tokensToBuy,
            props.address,
          )
        : wcBuyTokens(
            props.user,
            props.tokensToPay,
            props.tokensToBuy,
            props.address,
            walletProvider,
          ),
      {
        loading: t("info"),
        success: () => {
          userContext.setLatestPurchase(Date.now().toString());
          setLoading(false);
          return t("success");
        },
        error: () => {
          setLoading(false);
          return t("error");
        },
      },
    );
  }

  return loading ? (
    <Button title={t("loading")} color={"loading"} arrow={false} />
  ) : (
    <Button
      title={t("default")}
      color={"main"}
      arrow={true}
      action={async () => {
        setLoading(true);
        await handlePurchase();
      }}
    />
  );
}
