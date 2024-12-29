"use client";

import { ByCrypto } from "@/app/[locale]/(public)/songs/[slug]/_components/PaymentMethods/ByCrypto";
import { Spinner } from "@/components/Spinner/Spinner";
import { Button } from "@/components/ui/Button/Button";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { computeTokenMinAmount, roundToTwo } from "@/services/helpers";
import { getSongAvailableTokens } from "@/services/songs";
import { getBalances } from "@/services/users/users";
import { useUserStore } from "@/store/user";
import Slider from "@mui/material/Slider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import s from "./SharesBlock.module.scss";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(246, 96, 31)",
    },
  },
});

export function SharesBlock(props: {
  price: number;
  tokenName: string;
  songId: number;
  slug: string;
}) {
  const t = useTranslations("SharesBlock");
  const price = roundToTwo(props.price / 10);
  const minTokensForBuy = computeTokenMinAmount(price);
  const currentLocale = useLocale();
  const setPayAccountModal = useUserStore((state) => state.setPayAccountModal);

  const currentUser = useUserStore((state) => state.currentUserEmail);
  const [prevAmount, setPrevAmount] = useState(price * minTokensForBuy);
  const [currentAmount, setCurrentAmount] = useState(price * minTokensForBuy);
  const [totalAmount, setTotalAmount] = useState<undefined | number>(undefined);
  const [loading, setLoading] = useState(false);
  const { balances, setBalances } = useUserStore();

  useEffect(() => {
    getSongAvailableTokens(props.slug).then((res) => {
      const balanceWithoutDecimals = Number(res.data.amount) / 10;
      const balance =
        balanceWithoutDecimals > 1000 ? 1000 : balanceWithoutDecimals;
      setTotalAmount(balance);
    });
  }, [props.slug, props.songId]);

  useEffect(() => {
    function computeInvestedAmount(tokenAmount: number, tokenPrice: number) {
      const floatAmount = tokenAmount * tokenPrice;
      return parseFloat(floatAmount.toFixed(2));
    }

    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          setLoading(true);
          const token = await user.getIdToken();

          const balancesRes = await getBalances(token);

          setBalances(balancesRes.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No user logged in");
      }
    });
  }, [setBalances]);

  function getMaxPrice() {
    if (!totalAmount) return 0;
    return roundToTwo(totalAmount * price);
  }

  function getTokenAmount() {
    const tokenAmount = currentAmount / price;
    return roundToTwo(tokenAmount / 10);
  }

  function changeAmountButton(down?: boolean) {
    if (
      (down && currentAmount == price * minTokensForBuy) ||
      (!down && currentAmount >= getMaxPrice())
    ) {
      return;
    }

    let newAmount;
    if (down) {
      newAmount = roundToTwo(prevAmount - price);
    } else {
      newAmount = roundToTwo(prevAmount + price);
    }
    setPrevAmount(newAmount);
    setCurrentAmount(newAmount);
  }

  const handleSliderChange = (
    _event: Event,
    value: number | number[],
    _activeThumb: number
  ) => {
    if (Array.isArray(value) || value > getMaxPrice()) {
      return;
    } else {
      setPrevAmount(roundToTwo(value));
      setCurrentAmount(roundToTwo(value));
    }
  };

  function PriceBlock() {
    return (
      <div className={s.priceBlock}>
        <div
          className={s.changeAmountButton}
          style={{ left: 4 }}
          onClick={() => {
            changeAmountButton(true);
          }}
        >
          <p style={{ fontSize: 16, userSelect: "none" }}>-</p>
        </div>
        <div className={s.priceTextBlock} style={{ width: 59 }}>
          <p style={{ fontSize: 9, fontWeight: 500 }}>{t("price")}</p>
          <p style={{ fontSize: 16, fontWeight: 700 }}>${currentAmount}</p>
        </div>
        <div className={s.priceTextBlock_divider} />
        <div className={s.priceTextBlock} style={{ width: 59 }}>
          <p style={{ fontSize: 9, fontWeight: 500 }}>{t("tokens")}</p>
          <p style={{ fontSize: 16, fontWeight: 700 }}>{getTokenAmount()}</p>
        </div>
        <div
          className={s.changeAmountButton}
          style={{ right: 4 }}
          onClick={() => {
            changeAmountButton();
          }}
        >
          <p style={{ fontSize: 16, userSelect: "none" }}>+</p>
        </div>
      </div>
    );
  }

  function PaymentButtons() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: "100%",
        }}
      >
        <ByCrypto
          user={currentUser}
          tokensToPay={currentAmount}
          tokensToBuy={getTokenAmount()}
          songId={props.songId}
          slug={props.slug}
        />
      </div>
    );
  }

  return totalAmount ? (
    <div className={s.sharesBlock}>
      <p className={s.title}>{t("header")}asd</p>
      <div className={s.priceBlockWrapper}>
        <PriceBlock />
        <ThemeProvider theme={theme}>
          <Slider
            value={currentAmount}
            defaultValue={price * minTokensForBuy}
            onChange={handleSliderChange}
            step={price}
            min={price * minTokensForBuy}
            max={getMaxPrice()}
            style={{ margin: "0 0 0 4px" }}
          />
        </ThemeProvider>
        <div className={s.rowContainer}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p className={s.boldSmallText}>{price * minTokensForBuy}</p>
            <p className={s.smallText}>{t("min")}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <p className={s.boldSmallText}>{getMaxPrice() || ""}</p>
            <p className={s.smallText}>{t("max")}</p>
          </div>
        </div>
      </div>
      {currentUser ? (
        <>
          {balances.length ? (
            <>
              <PaymentButtons />

              <div className={s.balanceContainer}>
                <div className={s.balanceContainer_cryptos}>
                  <p className={s.balanceContainer_title}>
                    {t("balanceStatus")}
                  </p>
                  {balances.map((item, index) => (
                    <div key={index} className={s.balanceContainer_cryptoItem}>
                      <p>{item.currency.symbol} -</p>
                      <p className={s.balanceContainer_cryptoItem_amount}>
                        {Number(item.balance).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <Button
                  title={t("pay_with_account")}
                  color={"main"}
                  arrow={true}
                  path={"/profile"}
                />
              </div>
            </>
          ) : (
            <div className={s.balanceContainer}>
              <Button
                title={t("pay_with_account")}
                color={"main"}
                arrow={true}
                path={"/profile"}
              />
            </div>
          )}
        </>
      ) : (
        <p style={{ color: "white", fontWeight: 600, textAlign: "center" }}>
          {t("please_login_artist")}
        </p>
      )}
    </div>
  ) : totalAmount === undefined ? (
    <div className={s.sharesBlock}>
      <p className={s.title}>{t("header")}</p>
      <Spinner />
    </div>
  ) : (
    <div className={s.sharesBlock}>
      <p className={s.title}>{t("sold_out")}</p>
    </div>
  );
}
