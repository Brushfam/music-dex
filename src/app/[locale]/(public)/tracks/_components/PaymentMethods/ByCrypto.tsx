"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { useRouter } from "next/navigation";
import { createInvoice } from "@/services/users/investors/investors";
import {useUserStore} from "@/store/user";

export function ByCrypto(props: {
  user: string;
  tokensToPay: number;
  tokensToBuy: number;
  address: string;
}) {
  const t = useTranslations("SharesBlock.ByCrypto");
  const router = useRouter();
  const setOrderLink = useUserStore((state) => state.setOrderLink);

  async function handlePurchase() {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken(true);
        createInvoice(token, props.tokensToBuy)
          .then((res) => {
            setOrderLink(res.data.order_url.toString());
          })
          .catch((error) => {
            console.log(error);
            toast.error(t("error"));
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
