"use client";

import s from "@/app/[locale]/tracks/ukrainian-sun/page.module.scss";
import { trackDataEN, trackDataUK } from "@/data/trackData";
import { useLocale } from "use-intl";

export function UkrainianSunDescription() {
  const currentLocale = useLocale();
  const trackData = currentLocale === "uk" ? trackDataUK : trackDataEN;

  return <p className={s.descriptionText}>{trackData.description}</p>;
}
