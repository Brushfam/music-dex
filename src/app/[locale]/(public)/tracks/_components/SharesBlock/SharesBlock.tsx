"use client";

import s from "./SharesBlock.module.scss";
import React, { useEffect, useRef, useState } from "react";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Spinner } from "@/components/Spinner/Spinner";
import { ByCrypto } from "@/app/[locale]/(public)/tracks/_components/PaymentMethods/ByCrypto";
import { useTranslations } from "next-intl";
import { roundToTwo } from "@/services/helpers";
import { Tooltip } from "@mui/material";
import { strkGetFreeBalance } from "@/services/blockchain/server";
import {useUserStore} from "@/store/user";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(246, 96, 31)",
    },
  },
});

export function SharesBlock(props: {
  price: number;
  tokenAddress: string;
  tokenName: string;
    setApprovePurchaseModal: React.Dispatch<React.SetStateAction<string>>;
}) {
  const t = useTranslations("SharesBlock");
  const price = roundToTwo(props.price);

    const currentUser = useUserStore((state) => state.currentUserEmail)
  const [prevAmount, setPrevAmount] = useState(price*24);
  const [currentAmount, setCurrentAmount] = useState(price*24);
  const [totalAmount, setTotalAmount] = useState<undefined | number>(undefined);

  useEffect(() => {
    strkGetFreeBalance(props.tokenAddress).then((fullBalance) => {
      const balanceWithoutDecimals = Number(fullBalance) / 10;
      const balance =
        balanceWithoutDecimals > 1000 ? 1000 : balanceWithoutDecimals;
      setTotalAmount(balance);
    });
  }, [props.tokenAddress]);

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
      (down && currentAmount == price*24) ||
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
    _activeThumb: number,
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
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <ByCrypto
          user={currentUser}
          tokensToPay={currentAmount}
          tokensToBuy={getTokenAmount()}
          address={props.tokenAddress}
          setApprovePurchaseModal={props.setApprovePurchaseModal}
        />
        <Tooltip title={t("fiat_description")} enterTouchDelay={0}>
          <div className={s.disabledFiat}>
            <p>{t("fiat_title")}</p>
          </div>
        </Tooltip>
      </div>
    );
  }

  return totalAmount ? (
    <div className={s.sharesBlock}>
      <p className={s.title}>{t("header")}</p>
      <div className={s.priceBlockWrapper}>
        <PriceBlock />
        <ThemeProvider theme={theme}>
          <Slider
            value={currentAmount}
            defaultValue={price*24}
            onChange={handleSliderChange}
            step={price}
            min={price*24}
            max={getMaxPrice()}
            style={{ margin: "0 0 0 4px" }}
          />
        </ThemeProvider>
        <div className={s.rowContainer}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p className={s.boldSmallText}>{price*24}</p>
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
        <PaymentButtons />
      ) : (
        <p style={{ color: "white", fontWeight: 600 }}>{t("please_login")}</p>
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
