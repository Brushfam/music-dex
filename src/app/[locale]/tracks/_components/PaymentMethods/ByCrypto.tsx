"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { unipassBuyTokens, wcBuyTokens } from "@/services/ethersMethods";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { hasEnoughMATIC, hasEnoughUSDT } from "@/services/serverMethods";
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
    const enoughUSDT = await hasEnoughUSDT(props.user, props.tokensToPay);
    const enoughMATIC = await hasEnoughMATIC(props.user);

    if (!enoughUSDT || !enoughMATIC) {
      props.setLowBalanceModal(true);
      setLoading(false);
      return;
    }

    toast.promise(
      userContext.wallet === "Unipass"
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
