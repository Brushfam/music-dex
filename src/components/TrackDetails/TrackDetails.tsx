"use client";

import { useTranslations } from "next-intl";
import s from "./TrackDetails.module.scss";

export function TrackDetails(props: {
  rightsholder: string;
  releaseDate: string;
  listeningDate: string;
  totalSupply: number;
  price: number;
}) {
  const t = useTranslations("Catalog");

  return (
    <div className={s.trackDetails}>
      <div className={s.trackDetails_topRow}>
        <p>{t("rights_holder")}</p>
        <p>{props.rightsholder}</p>
      </div>
      <div className={s.trackDetails_standartRow}>
        <p>{t("release_date")}</p>
        <p>{props.releaseDate}</p>
      </div>
      <div className={s.trackDetails_standartRow}>
        <p>{t("listening_date")}</p>
        <p>{props.listeningDate}</p>
      </div>
      <div className={s.trackDetails_standartRow}>
        <p>{t("blockchain")}</p>
        <p>{t("starknet")}</p>
      </div>
      <div className={s.trackDetails_standartRow}>
        <p>{t("total_supply")}</p>
        <p>{props.totalSupply}</p>
      </div>
      <div className={s.trackDetails_standartRow}>
        <p style={{ fontWeight: 700 }}>{t("price_text")}</p>
        <p style={{ fontWeight: 700 }}>${props.price}</p>
      </div>
    </div>
  );
}
