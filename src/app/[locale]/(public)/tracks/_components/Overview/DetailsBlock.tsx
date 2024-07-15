"use client";

import s from "@/app/[locale]/(public)/tracks/_components/Overview/Overview.module.scss";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { strkGetFreeBalance } from "@/services/blockchain/server";
import { Spinner } from "@/components/Spinner/Spinner";

export function DetailsBlock(props: { tokenAddress: string }) {
  const t = useTranslations("Tracks.Overview");
  const [totalAmount, setTotalAmount] = useState<number | undefined>(undefined);
  const [totalPurchased, setTotalPurchased] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    strkGetFreeBalance(props.tokenAddress).then((fullBalance) => {
      const balanceWithoutDecimals = Number(fullBalance) / 10;
      setTotalAmount(parseFloat(balanceWithoutDecimals.toFixed(2)));
      const totalSupply = 10_000;
      const remaining = totalSupply - balanceWithoutDecimals
      setTotalPurchased(parseFloat(remaining.toFixed(2)));
    });
  });

  return (
    <div className={s.detailsBlock}>
      <div className={s.details}>
        <p>{t("price_per_token")}</p>
        <p>$2.2</p>
      </div>
      <div className={s.details}>
        <p>{t("total_purchased_tokens")}</p>
        {totalPurchased === undefined ? <Spinner /> : <p>{totalPurchased}</p>}
      </div>
      <div className={s.details}>
        <p>{t("tokens_remaining")}</p>
        {totalPurchased === undefined ? <Spinner /> : <p>{totalAmount}</p>}
      </div>
    </div>
  );
}
