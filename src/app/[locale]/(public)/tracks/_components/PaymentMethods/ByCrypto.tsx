"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { useRouter } from "next/navigation";
import { createInvoice } from "@/services/users/investors";

export function ByCrypto(props: {
  user: string;
  tokensToPay: number;
  tokensToBuy: number;
  address: string;
  setApprovePurchaseModal: React.Dispatch<React.SetStateAction<string>>;
}) {
  const t = useTranslations("SharesBlock.ByCrypto");
  const router = useRouter();

  async function handlePurchase() {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken(true);
        createInvoice(token, props.tokensToBuy)
          .then((res) => {
            props.setApprovePurchaseModal(res.data.order_url.toString());
          })
          .catch((error) => {
            console.log(error);
            toast.error("Something went wrong");
          });
      } else {
        router.replace("/en/auth/login?expired-session=true");
      }
    });
  }

  return (
    <Button
      title={t("default")}
      color={"main"}
      arrow={true}
      action={async () => {
        await handlePurchase();
      }}
    />
  );
}
