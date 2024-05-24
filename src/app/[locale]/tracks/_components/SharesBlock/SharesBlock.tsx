"use client";

import s from "./SharesBlock.module.scss";
import React, { useEffect, useRef, useState } from "react";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Spinner } from "@/components/Spinner/Spinner";
import { ByCrypto } from "@/app/[locale]/tracks/_components/PaymentMethods/ByCrypto";
import { Button } from "@/components/ui/Button/Button";
import { useTranslations } from "next-intl";
import { roundToTwo } from "@/services/helpers";
import { Tooltip } from "@mui/material";
import { getUsdRate } from "@/services/services";
import { strkGetFreeBalance } from "@/services/blockchain/server";
import { useUserStore } from "@/store/user";

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
  setAgreementModal: React.Dispatch<React.SetStateAction<boolean>>;
  setLowBalanceModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const t = useTranslations("SharesBlock");
  const price = roundToTwo(props.price);
  let usdRate = useRef(38.8);

  const currentUser = useUserStore((state) => state.currentUser);
  const hasAgreement = useUserStore((state) => state.hasAgreement);
  const latestPurchase = useUserStore((state) => state.latestPurchase);
  const [prevAmount, setPrevAmount] = useState(price);
  const [currentAmount, setCurrentAmount] = useState(price);
  const [totalAmount, setTotalAmount] = useState<undefined | number>(undefined);

  useEffect(() => {
    getUsdRate()
      .then((rate) => {
        usdRate.current = rate;
      })
      .catch((e) => {
        console.log(e);
      });

    strkGetFreeBalance(props.tokenAddress).then((fullBalance) => {
      const balanceWithoutDecimals = Number(fullBalance) / 10;
      const balance =
        balanceWithoutDecimals > 1000 ? 1000 : balanceWithoutDecimals;
      setTotalAmount(balance);
    });
  }, [
    props.tokenAddress,
    hasAgreement,
    latestPurchase,
  ]);

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
      (down && currentAmount == price) ||
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
          <p style={{ fontSize: 9, fontWeight: 500 }}>{t("price")}*</p>
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
    return hasAgreement.toString() == "true" ? (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <ByCrypto
          user={currentUser}
          tokensToPay={currentAmount}
          tokensToBuy={getTokenAmount()}
          address={props.tokenAddress}
          setLowBalanceModal={props.setLowBalanceModal}
        />
        <Tooltip title={t("fiat_description")} enterTouchDelay={0}>
          <div className={s.disabledFiat}>
            <p>{t("fiat_title")}</p>
          </div>
        </Tooltip>
      </div>
    ) : (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Button
          title={t("sign_agreement")}
          color={"main"}
          arrow={true}
          action={() => {
            props.setAgreementModal(true);
          }}
        />
        <p style={{ textAlign: "center", fontSize: 13, lineHeight: "120%" }}>
          {t("agreement_description")}
        </p>
      </div>
    );
  }

  return totalAmount ? (
    <div className={s.sharesBlock}>
      <p className={s.title}>{t("header")}</p>
      <div className={s.priceBlockWrapper}>
        <PriceBlock />
        <p className={s.nbuText}>
          *UAH {roundToTwo(currentAmount * usdRate.current)}
          {t("nbu_text", { rate: usdRate.current.toString() })}
        </p>
        <ThemeProvider theme={theme}>
          <Slider
            value={currentAmount}
            defaultValue={price}
            onChange={handleSliderChange}
            step={price}
            min={price}
            max={getMaxPrice()}
            style={{ margin: "0 0 0 4px" }}
          />
        </ThemeProvider>
        <div className={s.rowContainer}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p className={s.boldSmallText}>{price}</p>
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
