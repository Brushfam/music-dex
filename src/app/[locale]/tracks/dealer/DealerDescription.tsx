"use client";

import s from "@/app/[locale]/tracks/ukrainian-sun/page.module.scss";
import { ukrainianSunDataEN, ukrainianSunDataUK } from "@/data/tracksData";
import { useLocale } from "use-intl";

export function UkrainianSunDescription() {
  const currentLocale = useLocale();
  const trackData =
    currentLocale === "uk" ? ukrainianSunDataUK : ukrainianSunDataEN;

  return <p className={s.descriptionText}>{trackData.description}</p>;
}
