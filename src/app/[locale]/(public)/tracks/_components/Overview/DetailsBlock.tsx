"use client";

import s from "@/app/[locale]/(public)/tracks/_components/Overview/Overview.module.scss";
import { Spinner } from "@/components/Spinner/Spinner";
import { getSongAvailableTokens } from "@/services/songs";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function DetailsBlock(props: {
  songId: number;
  price: number;
  totalSupply: number;
}) {
  const t = useTranslations("Tracks.Overview");
  const [totalAmount, setTotalAmount] = useState<number | undefined>(undefined);
  const [totalPurchased, setTotalPurchased] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    getSongAvailableTokens(props.songId).then((res) => {
      const balanceWithoutDecimals = Number(res.data.amount) / 10;
      setTotalAmount(parseFloat(balanceWithoutDecimals.toFixed(2)));
      const totalSupply = props.totalSupply;
      const remaining = totalSupply - balanceWithoutDecimals;
      setTotalPurchased(parseFloat(remaining.toFixed(2)));
    });
  });

  return (
    <div className={s.detailsBlock}>
      <div className={s.details}>
        <p>{t("price_per_token")}</p>
        <p>${props.price}</p>
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
