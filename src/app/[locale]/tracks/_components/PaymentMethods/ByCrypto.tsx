import { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { unipassBuyTokens} from "@/services/unipass";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function ByCrypto(props: {
  user: string;
  tokensToPay: string;
  tokensToBuy: number;
  address: string;
}) {
  const t = useTranslations("SharesBlock.ByCrypto");
  const [loading, setLoading] = useState(false);

  function handlePurchase() {
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
      action={() => {
        setLoading(true);
        handlePurchase();
      }}
    />
  );
}
