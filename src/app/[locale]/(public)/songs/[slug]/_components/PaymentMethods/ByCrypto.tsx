"use client";

import { Button } from "@/components/ui/Button/Button";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { handleInitCheckoutPixelEvent } from "@/services/pixel";
import { createInvoice } from "@/services/users/investors/investors";
import { ifUserHasWallets } from "@/services/users/investors/wallets";
import { useUserStore } from "@/store/user";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function ByCrypto(props: {
  user: string;
  tokensToPay: number;
  tokensToBuy: number;
  songId: number;
  slug: string;
}) {
  const t = useTranslations("SharesBlock.ByCrypto");
  const router = useRouter();
  const setOrderLink = useUserStore((state) => state.setOrderLink);
  const setNoWalletsModal = useUserStore((state) => state.setNoWalletsModal);
  const setPayAccountModal = useUserStore((state) => state.setPayAccountModal);

  async function handlePurchase() {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        handleInitCheckoutPixelEvent([props.slug], {
          id: props.slug,
          quantity: props.tokensToBuy,
        });
        const token = await user.getIdToken(true);
        try {
          const response = await ifUserHasWallets(token);
          if (response.data.hasWallets) {
            createInvoice(token, props.songId, props.tokensToBuy).then(
              (res) => {
                setOrderLink(res.data.order_url.toString());
              }
            );
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
      action={() => setPayAccountModal("true")}
    />
  );
}
