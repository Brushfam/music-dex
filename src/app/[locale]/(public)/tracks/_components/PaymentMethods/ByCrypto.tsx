"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { hasEnoughBalance } from "@/services/blockchain/server";
import { useAccount } from "@starknet-react/core";
import { buyTokensStarknet } from "@/services/blockchain/client";
import { trackAddresses } from "@/data/tracksData";
import { useUserStore } from "@/store/user";

export function ByCrypto(props: {
  user: string;
  tokensToPay: number;
  tokensToBuy: number;
  address: string;
  setLowBalanceModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const t = useTranslations("SharesBlock.ByCrypto");
  const currentUser = useUserStore((state) => state.currentUserName);
  const [loading, setLoading] = useState(false);
  const { account } = useAccount();

  async function handlePurchase() {
    if (!(await hasEnoughBalance(currentUser, props.tokensToPay))) {
      props.setLowBalanceModal(true);
      setLoading(false);
      return;
    }

    if (!account) {
      setLoading(false);
      return;
    }

    toast.promise(
      buyTokensStarknet(
        account,
        trackAddresses.dealer,
        props.tokensToPay,
        props.tokensToBuy,
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
