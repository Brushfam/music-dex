import { Button } from "@/components/ui/Button/Button";
import {
  TopUpMethodEnum,
  TopUpStepEnum,
  useBalanceStore,
} from "@/store/balance";
import { useCallback } from "react";
import styles from "./Balance.module.scss";
import { Popup } from "./Popup";

export function TopUpPopup() {
  const { setTopUpMethod, setTopUpStep } = useBalanceStore();

  const handleButtonClick = useCallback(
    (method: TopUpMethodEnum) => {
      setTopUpMethod(method);
      setTopUpStep(TopUpStepEnum.REPLENISH);
    },
    [setTopUpMethod, setTopUpStep]
  );

  return (
    <Popup title="Top up your balance">
      <div className={styles.topUpPopup}>
        <Button
          arrow={false}
          color="main"
          title="With connected wallet"
          action={() => handleButtonClick(TopUpMethodEnum.WALLET)}
        />
        <Button
          color="grey"
          arrow
          fullLength
          between
          title="Whitepay"
          action={() => handleButtonClick(TopUpMethodEnum.WHITEPAY)}
        />
      </div>
    </Popup>
  );
}
