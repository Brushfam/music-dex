import { Select } from "@/components/Select/Select";
import { Button } from "@/components/ui/Button/Button";
import { TopUpStepEnum, useBalanceStore } from "@/store/balance";
import { ChangeEventHandler, useCallback, useState } from "react";
import styles from "./Balance.module.scss";
import { Popup } from "./Popup";

export function ReplenishPopup() {
  const { setTopUpStep } = useBalanceStore();

  const [amount, setAmount] = useState(10);
  const [token, setToken] = useState("usdt");

  const tokenOptions = [
    {
      value: "usdt",
      label: "USDT",
      image: "/profile/balance/tether.png",
    },
    {
      value: "eth",
      label: "ETH",
      image: "/profile/balance/tether.png",
    },
    {
      value: "btc",
      label: "BTC",
      image: "/profile/balance/tether.png",
    },
  ];

  const handleDecrease = () => {
    if (amount > 10) setAmount(amount - 1);
  };

  const handleIncrease = () => {
    if (amount < 1000) setAmount(amount + 1);
  };

  const handleSliderChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const value = Number(e.target.value);

      if (!value) {
        return;
      }

      setAmount(value);
    },
    []
  );

  return (
    <Popup title="Enter the top-up amount">
      <div className={styles.replenishContainer}>
        <div className={styles.amountContainer}>
          <h3>Enter Amount</h3>
          <div className={styles.amountInput}>
            <button onClick={handleDecrease}>-</button>
            <span className={styles.amount}>${amount}</span>
            <button onClick={handleIncrease}>+</button>
          </div>
          <div className={styles.sliderContainer}>
            <span>10 min.</span>
            <input
              type="range"
              min="10"
              max="1000"
              value={amount}
              onChange={handleSliderChange}
              className={styles.slider}
            />
            <span>1000 min.</span>
          </div>
        </div>
        <div className={styles.currencyContainer}>
          <h3>Currency</h3>
          <Select
            value={token}
            onChange={(option) => setToken(option.value)}
            options={tokenOptions}
          />
        </div>
      </div>

      <div className={styles?.replenishBtnGroup}>
        <Button
          title="Back"
          color="main"
          arrow={false}
          action={() => setTopUpStep(TopUpStepEnum.CHOICE)}
        />
        <Button title="Replenish" color="grey" arrow={true} />
      </div>
    </Popup>
  );
}
