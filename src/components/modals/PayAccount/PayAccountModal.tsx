"use client";

import { Popup } from "@/app/[locale]/(private)/profile/_investor/balance/Popup";
import { Select } from "@/components/Select/Select";
import { Button } from "@/components/ui/Button/Button";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { fetchInvoice, getBalances } from "@/services/users/users";
import { useUserStore } from "@/store/user";
import getTokens from "@/utils/getTokens";
import _ from "lodash";
import { useTranslations } from "next-intl";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import styles from "./PayAccountModal.module.scss";

const { tokenOptions } = getTokens();
const url = process.env.NEXT_PUBLIC_SERVERTEST_URL;

const steps: Record<string, number> = {
  USDT: 0.1,
  ETH: 0.001,
  STRK: 0.01,
  SOL: 0.1,
};

const currencyImages: Record<string, string> = {
  USDT: "/profile/balance/tether.png",
  ETH: "/profile/balance/eth.png",
  STRK: "/profile/balance/tether.png",
  SOL: "/profile/balance/sol.png",
};

export function PayAccountModal({ songId }: { songId: number }) {
  const t = useTranslations("SharesBlock.PayAccount");
  const payAccountModal = useUserStore((state) => state.payAccountModal);
  const setPayAccountModal = useUserStore((state) => state.setPayAccountModal);
  const { balances, setBalances } = useUserStore();
  const [jwt, setJwt] = useState("");

  const [amount, setAmount] = useState(0);

  const [token, setToken] = useState(balances[0]?.currency?.symbol);

  const currentBalance = balances.find(
    (balance) => balance.currency.symbol === token
  );

  const handleDecrease = () => {
    const changedAmount = _.round(amount - steps[token], 9);
    if (changedAmount < 0) {
      return setAmount(0);
    }
    setAmount(changedAmount);
  };

  const handleIncrease = () => {
    if (amount < parseFloat(currentBalance?.balance!))
      setAmount(_.round(amount + steps[token], 9));
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

  const handleReplenish = async () => {
    if (Number(currentBalance?.balance) < 0) {
      return;
    }
    console.log(songId);
    await fetchInvoice(jwt, {
      song_id: songId,
      amount: +amount,
      currency: token,
    });

    const balancesRes = await getBalances(jwt);

    setBalances(balancesRes.data);

    setPayAccountModal("");
  };

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setJwt(token);
      }
    });
  }, []);

  useEffect(() => {
    setToken(balances[0]?.currency?.symbol);
  }, [balances]);

  return payAccountModal ? (
    <Popup title={t("payWithAccount")}>
      <div className={styles.replenishContainer}>
        <div className={styles.amountContainer}>
          <h3>{t("enterAmount")}</h3>
          <div className={styles.amountInput}>
            <button onClick={handleDecrease}>-</button>
            <span className={styles.amount}>${amount}</span>
            <button onClick={handleIncrease}>+</button>
          </div>
          <div className={styles.sliderContainer}>
            <span>0 {t("min")}</span>
            <input
              type="range"
              min="0"
              step={steps[token]}
              max={currentBalance?.balance}
              value={amount}
              onChange={handleSliderChange}
              className={styles.slider}
            />
            <span>
              {_.round(+currentBalance?.balance!, 9)} {t("max")}
            </span>
          </div>
        </div>
        <div className={styles.currencyContainer}>
          <h3>{t("currency")}</h3>
          <Select
            value={token as string}
            onChange={(option) => {
              setToken(option.value);
              setAmount(0);
            }}
            options={balances.map((item) => ({
              value: item.currency.symbol,
              label: item.currency.symbol,
              image: currencyImages[item.currency.symbol],
            }))}
          />
          <span>
            {t("balance")}:{_.round(+currentBalance?.balance!, 9)}
          </span>
        </div>
      </div>

      <div className={styles.balance}>
        <h3>{t("balancebyCriptio")}</h3>
        <div className={styles.balance_container}>
          {balances.map((item, index) => (
            <>
              <div key={index} className={styles.balance_item}>
                <p>
                  {item.currency.symbol} <span>-</span>{" "}
                  {_.round(+item.balance!, 9) || "0"}
                </p>
              </div>
              {balances.length - 1 !== index && (
                <div className={styles.balance_line}></div>
              )}
            </>
          ))}
        </div>
      </div>

      <div className={styles?.replenishBtnGroup}>
        <Button
          title={t("back")}
          color="main"
          arrow={false}
          action={() => setPayAccountModal("")}
        />
        <Button
          action={handleReplenish}
          title={t("replenish")}
          color={Number(currentBalance?.balance) > 0 ? "grey" : "loading"}
          arrow={true}
        />
      </div>
    </Popup>
  ) : null;
}
