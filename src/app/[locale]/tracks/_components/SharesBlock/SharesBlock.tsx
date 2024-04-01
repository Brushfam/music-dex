"use client";

import s from "./SharesBlock.module.scss";
import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getFreeTokenBalance } from "@/services/unipass-server";
import { UseUser } from "@/context/UserContext";
import { Spinner } from "@/components/Spinner/Spinner";
import { ByCrypto } from "@/app/[locale]/tracks/_components/PaymentMethods/ByCrypto";
import { Button } from "@/components/ui/Button/Button";
import { useTranslations } from "next-intl";
import { roundToTwo } from "@/services/helpers";
import { Tooltip } from "@mui/material";

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
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const userContext = UseUser();
  const t = useTranslations("SharesBlock");
  const price = props.price;
  const [prevAmount, setPrevAmount] = useState(price);
  const [currentAmount, setCurrentAmount] = useState(price);
  const [totalAmount, setTotalAmount] = useState<undefined | number>(undefined);

  useEffect(() => {
    if (!props.tokenAddress.length) {
      setTotalAmount(0);
    } else {
      let total = getFreeTokenBalance(props.tokenAddress);
      total.then((res) => {
        let partOfSupply = res < 1000 ? res : 1000;
        setTotalAmount(partOfSupply);
      });
    }
  }, [props.tokenAddress, userContext.hasAgreement]);

  function getMaxPrice() {
    if (!totalAmount) return 0;
    return roundToTwo(totalAmount * price);
  }

  function getTokenAmount() {
    return Math.round(currentAmount / price);
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
      setPrevAmount(value);
      setCurrentAmount(value);
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
    return userContext.hasAgreement.toString() == "true" ? (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <ByCrypto
          user={userContext.currentUser}
          tokensToPay={currentAmount.toString()}
          tokensToBuy={currentAmount / price}
          address={props.tokenAddress}
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
            props.setModal(true);
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
        <ThemeProvider theme={theme}>
          <Slider
            value={currentAmount}
            defaultValue={price}
            onChange={handleSliderChange}
            step={price}
            min={price}
            max={getMaxPrice()}
            style={{ margin: "4px 0 0 4px" }}
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
      {userContext.currentUser ? (
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
