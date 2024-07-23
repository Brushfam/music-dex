import s from "./Gallery.module.scss";
import { useLocale } from "use-intl";
import * as React from "react";
import { Incrypted2024 } from "@/app/[locale]/(public)/gallery/Incrypted2024";
import { useTranslations } from "next-intl";

export default function Gallery() {
  const t = useTranslations("Gallery");

  return (
    <div className={s.galleryWrapper}>
      <div className={s.blogTitleBlock}>
        <p className={s.blogTitleBlock_title}>{t("title")}</p>
        <p className={s.blogTitleBlock_description}>{t("description")}</p>
      </div>
      <Incrypted2024 />
    </div>
  );
}
