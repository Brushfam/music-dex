"use client";

import { Popup } from "@/app/[locale]/(private)/profile/_investor/balance/Popup";
import { Select } from "@/components/Select/Select";
import { Button } from "@/components/ui/Button/Button";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { fetchInvoice, getBalances } from "@/services/users/users";
import { useUserStore } from "@/store/user";
import _ from "lodash";
import { useTranslations } from "next-intl";
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import styles from "./PayAccountModal.module.scss";

const currencyImages: Record<string, string> = {
  USDT: "/profile/balance/usdt.png",
  ETH: "/profile/balance/eth.png",
  STRK: "/profile/balance/strk.png",
  SOL: "/profile/balance/sol.png",
};

export function PayAccountModal({
  songId,
  songToken,
}: {
  songId: number;
  songToken: number;
}) {
  const t = useTranslations("SharesBlock.PayAccount");
  const payAccountModal = useUserStore((state) => state.payAccountModal);
  const setPayAccountModal = useUserStore((state) => state.setPayAccountModal);
  const { balances, setBalances } = useUserStore();
  const [jwt, setJwt] = useState("");
  const [amount, setAmount] = useState<number | string>(0);
  const [value, setValue] = useState(0);

  const [token, setToken] = useState(balances[0]?.currency?.symbol);
  const currentBalance = useMemo(
    () => balances.find((balance) => balance.currency.symbol === token),
    [balances, token]
  );
  const handleSliderChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const value = Number(e.target.value);

      if (!value) {
        return;
      }

      const newAmount =
        Math.round(((Number(currentBalance?.balance) * value) / 100) * 100000) /
        100000;

      setAmount(newAmount);
      setValue(value);
    },
    [currentBalance]
  );

  const handleReplenish = async () => {
    if (Number(currentBalance?.balance) < +amount) {
      toast.error(t("no_balance"));
      return;
    } else if (+amount <= 0) {
      toast.error(t("enter_amount"));
      return;
    }

    try {
      await fetchInvoice(jwt, {
        song_id: songId,
        amount: +amount,
        currency: token,
      });
      const balancesRes = await getBalances(jwt);
      setBalances(balancesRes.data);
      setPayAccountModal("");
      toast.success(t("successful"));
    } catch {
      setPayAccountModal("");
      toast.error(t("failed"));
    }
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
            <input
              value={amount}
              onChange={(e) => {
                if (/^\d*\.?\d*$/.test(e.target.value)) {
                  let inputValue = e.target.value.trim();
                  if (inputValue === "" || inputValue === "0") {
                    setAmount(0);
                    return;
                  }
                  if (inputValue.indexOf(".") > 0) {
                    setAmount(inputValue);
                    return;
                  }
                  if (inputValue.startsWith("0")) {
                    inputValue = inputValue.slice(1);
                  }
                  setAmount(inputValue);
                  setValue((+e.target.value / +currentBalance?.balance!) * 100);
                }
              }}
              type="text"
              className={styles.amount}
            />
          </div>

          <div className={styles.sliderContainer}>
            <span>0%</span>
            <input
              type="range"
              min="1"
              max={100}
              value={value}
              onChange={handleSliderChange}
              className={styles.slider}
            />
            <span>100%</span>
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
            {t("token")}:
            {((+currentBalance?.price! * +amount) / songToken).toFixed(2)}
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
