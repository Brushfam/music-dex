import { Button } from "@/components/ui/Button/Button";
import {
  TopUpMethodEnum,
  TopUpStepEnum,
  useBalanceStore,
} from "@/store/balance";
import { useAccount } from "@starknet-react/core";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "sonner";
import styles from "./Balance.module.scss";
import { Popup } from "./Popup";

export function TopUpPopup() {
  const { setTopUpMethod, setTopUpStep } = useBalanceStore();
  const t = useTranslations("ProfileInvestor.Balance");

  const { isConnected } = useAccount();

  const handleWalletClick = useCallback(() => {
    if (!isConnected) {
      toast.error(t(`errorConnect`));
      setTopUpStep(null);
      return;
    }

    setTopUpMethod(TopUpMethodEnum.WALLET);
    setTopUpStep(TopUpStepEnum.REPLENISH);
  }, [setTopUpMethod, setTopUpStep, isConnected, t]);

  const handleWhitepayClick = useCallback(() => {
    setTopUpMethod(TopUpMethodEnum.WHITEPAY);
    setTopUpStep(TopUpStepEnum.REPLENISH);
  }, [setTopUpMethod, setTopUpStep]);

  return (
    <Popup title={t("topUp")}>
      <div className={styles.topUpPopup}>
        <Button
          arrow={false}
          color="main"
          title={t("connectedWallet")}
          action={handleWalletClick}
        />
        <Button
          color="grey"
          arrow
          fullLength
          between
          title={t("whitepay")}
          action={handleWhitepayClick}
        />
      </div>
    </Popup>
  );
}
