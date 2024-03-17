"use client";

import s from "./SharesBlock.module.scss";
import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getFreeTokenBalance, hasAgreement } from "@/services/unipass";
import { UseUser } from "@/context/UserContext";
import { Spinner } from "@/components/Spinner/Spinner";
import { ByCrypto } from "@/app/[locale]/tracks/_components/PaymentMethods/ByCrypto";
import { Button } from "@/components/ui/Button/Button";

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
  const price = props.price;
  const [prevAmount, setPrevAmount] = useState(price);
  const [tokenAmount, setTokenAmount] = useState(price);
  const [totalAmount, setTotalAmount] = useState<undefined | number>(undefined);

  useEffect(() => {
    let total = getFreeTokenBalance(props.tokenAddress);
    total.then((r) => {
      setTotalAmount(r);
    });
  }, [props.tokenAddress, userContext.hasAgreement]);

  function getTotalAmount() {
    if (!totalAmount) return 0;
    return Math.round(totalAmount * price * 1e4) / 1e4;
  }

  function getPercentAmount() {
    let tokens = tokenAmount / price;
    let amount = (tokens / 100) * 100;
    return Math.round(amount * 1e2) / 1e2;
  }

  function changeAmountButton(down?: boolean) {
    if (
      (down && tokenAmount == price) ||
      (!down && tokenAmount >= getTotalAmount())
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
    if (Array.isArray(value) || value > getTotalAmount()) {
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
        <div className={s.priceTextBlock} style={{ width: 63 }}>
          <p style={{ fontSize: 8, fontWeight: 500 }}>Price</p>
          <p style={{ fontSize: 18, fontWeight: 700 }}>{tokenAmount}</p>
        </div>
        <div className={s.priceTextBlock_divider} />
        <div className={s.priceTextBlock}>
          <p style={{ fontSize: 8, fontWeight: 500 }}>Ownership</p>
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

  function PaymentButtons() {
    return userContext.hasAgreement.toString() == "true" ? (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <ByCrypto
          user={userContext.currentUser}
          tokensToPay={tokenAmount.toString()}
          tokensToBuy={tokenAmount / price}
          address={props.tokenAddress}
        />
        {/*<ByFiat*/}
        {/*  amount={tokenAmount}*/}
        {/*  productName={props.tokenName}*/}
        {/*  productPrice={price}*/}
        {/*  productCount={Math.ceil(tokenAmount / price)}*/}
        {/*/>*/}
      </div>
    ) : (
      <Button
        title={"Sign Agreement"}
        color={"main"}
        arrow={false}
        action={() => {
          props.setModal(true);
        }}
      />
    );
  }

  return totalAmount ? (
    <div className={s.sharesBlock}>
      <p className={s.title}>Select token amount</p>
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
            <p className={s.smallText}>min.</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <p className={s.boldSmallText}>{totalAmount}</p>
            <p className={s.smallText}>max.</p>
          </div>
        </div>
      </div>
      {userContext.currentUser ? (
        <PaymentButtons />
      ) : (
        <p style={{ color: "white", fontWeight: 600 }}>
          Please log in to buy tokens.
        </p>
      )}
    </div>
  ) : totalAmount === undefined ? (
    <div className={s.sharesBlock}>
      <p className={s.title}>Select token amount</p>
      <Spinner />
    </div>
  ) : (
    <div className={s.sharesBlock}>
      <p className={s.title}>Sold out</p>
    </div>
  );
}
