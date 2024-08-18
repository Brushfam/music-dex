"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "use-intl";
import s from "../ForArtist.module.scss";

export function SubmitSong() {
  const t = useTranslations("ForArtist");
  const currentLocale = useLocale();
  const submitLink =
    currentLocale === "en"
      ? "https://forms.gle/ZySVLZuwKgpu27RG6"
      : "https://forms.gle/GiC38UDHBSkVezLX6";
  return (
    <div className={s.submitSection}>
      <Link href={submitLink} target={"_blank"}>
        {t("submit_song")}
      </Link>
    </div>
  );
}
