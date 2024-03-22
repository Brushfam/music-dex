"use client";

import s from "./SharesBlock.module.scss";
import { useTranslations } from "next-intl";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(246, 96, 31)",
    },
  },
});

export function SharesBlock() {
  const t = useTranslations("SharesBlock");
  const price = 1;
  const totalSupply = 1000;
  const totalAmount = 300;
  const [prevAmount, setPrevAmount] = useState(price);
  const [tokenAmount, setTokenAmount] = useState(price);

  function getPercentAmount() {
    let tokens = tokenAmount / price;
    let amount = (tokens / totalSupply) * 100;
    return Math.round(amount * 1e2) / 1e2;
  }

  function changeAmountButton(down?: boolean) {
    if (
      (down && tokenAmount == price) ||
      (!down && tokenAmount >= totalAmount)
    ) {
      return;
    }

    let newAmount;
    if (down) {
      newAmount = Math.round((prevAmount - price) * 1e4) / 1e4;
    } else {
      newAmount = Math.round((prevAmount + price) * 1e4) / 1e4;
    }
    setPrevAmount(newAmount);
    setTokenAmount(newAmount);
  }

  const handleSliderChange = (
    _event: Event,
    value: number | number[],
    _activeThumb: number,
  ) => {
    if (Array.isArray(value) || value > totalAmount) {
      return;
    } else {
      setPrevAmount(value);
      setTokenAmount(value);
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
        <div className={s.priceTextBlock} style={{ width: 51 }}>
          <p style={{ fontSize: 9, fontWeight: 500 }}>{t("amount")}</p>
          <p style={{ fontSize: 18, fontWeight: 700 }}>{tokenAmount}</p>
        </div>
        <div className={s.priceTextBlock_divider} />
        <div className={s.priceTextBlock} style={{ width: 51 }}>
          <p style={{ fontSize: 9, fontWeight: 500 }}>{t("ownership")}</p>
          <p style={{ fontSize: 18, fontWeight: 700 }}>{getPercentAmount()}%</p>
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

  return (
    <div className={s.sharesBlock}>
      <p className={s.title}>{t("header")}</p>
      <div className={s.priceBlockWrapper}>
        <PriceBlock />
        <ThemeProvider theme={theme}>
          <Slider
            value={tokenAmount}
            defaultValue={price}
            onChange={handleSliderChange}
            step={price}
            min={price}
            max={price * totalAmount}
            style={{ margin: "4px 0 0 4px" }}
          />
        </ThemeProvider>
        <div className={s.rowContainer}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p className={s.boldSmallText}>1</p>
            <p className={s.smallText}>{t("min")}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <p className={s.boldSmallText}>{totalAmount}</p>
            <p className={s.smallText}>{t("max")}</p>
          </div>
        </div>
      </div>
      <button type={"button"} className={s.disabledButton}>
        {t("button_title")}
      </button>
      <p className={s.tip}>{t("button_description")}</p>
    </div>
  );
}
