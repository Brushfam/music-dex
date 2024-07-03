"use client";
import s from "../ForArtist.module.scss";
import Link from "next/link";
import { useLocale } from "use-intl";
import {useTranslations} from "next-intl";

export function SubmitSong() {
  const t = useTranslations("ForArtist");
  const currentLocale = useLocale();
  const submitLink =
    currentLocale === "en"
      ? "https://forms.gle/ZySVLZuwKgpu27RG6"
      : "https://forms.gle/GiC38UDHBSkVezLX6";
  return (
    <div className={s.submitSection}>
      <Link href={submitLink} target={"_blank"}>{t("submit_song")}</Link>
    </div>
  );
}
