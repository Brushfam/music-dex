"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { UseUser } from "@/context/UserContext";
import { starknetAddTokenholderBalance } from "@/services/blockchain/starknet";

export function ByCrypto(props: {
  user: string;
  tokensToPay: string;
  tokensToBuy: number;
  address: string;
  setLowBalanceModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const userContext = UseUser();
  const t = useTranslations("SharesBlock.ByCrypto");
  const [loading, setLoading] = useState(false);

  async function handlePurchase() {
    toast.promise(
      starknetAddTokenholderBalance(userContext.currentUser, Math.round(props.tokensToBuy)),
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
