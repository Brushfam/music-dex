import React, { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { unipassBuyTokens} from "@/services/unipass";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {hasEnoughBalance} from "@/services/unipass-server";

export function ByCrypto(props: {
  user: string;
  tokensToPay: string;
  tokensToBuy: number;
  address: string;
  setLowBalanceModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const t = useTranslations("SharesBlock.ByCrypto");
  const [loading, setLoading] = useState(false);

  async function handlePurchase() {
    if (!(await hasEnoughBalance(props.user, props.tokensToPay))) {
      props.setLowBalanceModal(true)
      setLoading(false);
      return;
    }

    toast.promise(
        unipassBuyTokens(
        props.user,
        props.tokensToPay,
        props.tokensToBuy,
        props.address,
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
      action={async() => {
        setLoading(true);
        await handlePurchase();
      }}
    />
  );
}
