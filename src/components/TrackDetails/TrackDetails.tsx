"use client";

import s from "./TrackDetails.module.scss";
import { trackDataType } from "@/types/types";
import { useLocale } from "use-intl";
import {useTranslations} from "next-intl";

export function TrackDetails(props: {
  dataEN: trackDataType;
  dataUK: trackDataType;
}) {
    const t = useTranslations("Catalog");
  const currentLocale = useLocale();
  const trackData = currentLocale === "uk" ? props.dataUK : props.dataEN;

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
        <p style={{ fontWeight: 700 }}>${trackData.price}</p>
      </div>
    </div>
  );
}
