"use client";

import { Popup } from "@/app/[locale]/(private)/profile/_investor/balance/Popup";
import { Select } from "@/components/Select/Select";
import { Button } from "@/components/ui/Button/Button";
import { useUserStore } from "@/store/user";
import getTokens from "@/utils/getTokens";
import { useTranslations } from "next-intl";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import styles from "./PayAccountModal.module.scss";

const { tokenOptions } = getTokens();
const url = process.env.NEXT_PUBLIC_SERVERTEST_URL;

async function fetchInvoice(songId: number, amount: number, currency: string) {
  try {
    const response = await fetch(url + "/users/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        song_id: songId,
        amount: amount,
        currency: currency,
      }),
    });

    const data = await response.json();
    console.log("Invoice response:", data);
  } catch (error) {
    console.error("Error while creating invoice:", error);
  }
}

export function PayAccountModal() {
  const t = useTranslations("SharesBlock.PayAccount");
  const payAccountModal = useUserStore((state) => state.payAccountModal);
  const setPayAccountModal = useUserStore((state) => state.setPayAccountModal);

  const [amount, setAmount] = useState(0);
  const [token, setToken] = useState(tokenOptions[0]);

  const handleDecrease = () => {
    if (amount > 0) setAmount(amount - 1);
  };

  const handleIncrease = () => {
    if (amount < renderBalances[0].balance) setAmount(amount + 1);
  };
  const [balanceData, setBalanceData] = useState<any[]>([]);

  console.log(balanceData);
  useEffect(() => {
    fetch(url + "users/balances")
      .then((response) => response.json())
      .then((data) => {
        setBalanceData(data);
      })
      .catch((error) => {
        console.error("Ошибка при получении баланса:", error);
      });
  }, []);
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
  const defaultBalances = [
    {
      currency: {
        name: "Stark",
        symbol: "STRK",
        currency_id: 1,
      },
      balance: 0,
    },
    {
      currency: {
        name: "Ethereum",
        symbol: "ETH",
        currency_id: 2,
      },
      balance: 0,
    },

    {
      currency: {
        name: "Solana",
        symbol: "SLN",
        currency_id: 3,
      },
      balance: 0,
    },
  ];
  const renderBalances = balanceData.length > 0 ? balanceData : defaultBalances;
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
              max={renderBalances[0].balance}
              value={amount}
              onChange={handleSliderChange}
              className={styles.slider}
            />
            <span>
              {renderBalances[0].balance} {t("max")}
            </span>
          </div>
        </div>
        <div className={styles.currencyContainer}>
          <h3>{t("currency")}</h3>
          <Select
            value={token.value}
            onChange={(option) => setToken(option)}
            options={tokenOptions}
          />
          <span>
            {t("balance")}:{renderBalances[0].balance}
          </span>
        </div>
      </div>

      <div className={styles.balance}>
        <h3>{t("balancebyCriptio")}</h3>
        <div className={styles.balance_container}>
          {renderBalances.map((item, index) => (
            <>
              <div key={index} className={styles.balance_item}>
                <p>
                  {item.currency.symbol} <span>-</span> {item.balance || "0"}
                </p>
              </div>
              {renderBalances.length - 1 !== index && (
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
          action={() => renderBalances[0].balance > 0 && console.log("object")}
          title={t("replenish")}
          color={renderBalances[0].balance > 0 ? "grey" : "loading"}
          arrow={true}
        />
      </div>
    </Popup>
  ) : null;
}
