"use client";

import { roundToTwo } from "@/services/helpers";
import { trackDataType } from "@/types/types";
import { useTranslations } from "next-intl";
import { useLocale } from "use-intl";
import s from "./TrackDetails.module.scss";

export function TrackDetails(props: {
  dataEN: trackDataType;
  dataUK: trackDataType;
}) {
  const t = useTranslations("Catalog");
  const currentLocale = useLocale();
  const trackData = currentLocale === "uk" ? props.dataUK : props.dataEN;
  const songDecimals = 10;
  const price = roundToTwo(songDecimals * trackData.price);

  return (
    <div className={s.trackDetails}>
      <div className={s.trackDetails_topRow}>
        <p>{t("rights_holder")}</p>
        <p>{trackData.rights_holder}</p>
      </div>
      {trackData.details.map((data, index) => {
        return (
          <div className={s.trackDetails_standartRow} key={index.toString()}>
            <p>{data.type}</p>
            <p>{data.value}</p>
          </div>
        );
      })}
      <div className={s.trackDetails_standartRow}>
        <p style={{ fontWeight: 700 }}>{t("price_text")}</p>
        <p style={{ fontWeight: 700 }}>${price}</p>
      </div>
    </div>
  );
}
