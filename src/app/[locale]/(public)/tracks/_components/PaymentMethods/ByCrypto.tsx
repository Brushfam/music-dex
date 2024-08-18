"use client";

import React from "react";
import { Button } from "@/components/ui/Button/Button";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { useRouter } from "next/navigation";
import { createInvoice } from "@/services/users/investors/investors";
import { useUserStore } from "@/store/user";
import { ifUserHasWallets } from "@/services/users/investors/wallets";

export function ByCrypto(props: {
  user: string;
  tokensToPay: number;
  tokensToBuy: number;
  songId: number;
}) {
  const t = useTranslations("SharesBlock.ByCrypto");
  const router = useRouter();
  const setOrderLink = useUserStore((state) => state.setOrderLink);
  const setNoWalletsModal = useUserStore((state) => state.setNoWalletsModal);

  async function handlePurchase() {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken(true);
        try {
          const response = await ifUserHasWallets(token);
          if (response.data.hasWallets) {
            createInvoice(token, props.songId, props.tokensToBuy).then((res) => {
              setOrderLink(res.data.order_url.toString());
            });
          } else {
            setNoWalletsModal("true");
          }
        } catch (error) {
          console.log(error);
          toast.error(t("error"));
        }
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
