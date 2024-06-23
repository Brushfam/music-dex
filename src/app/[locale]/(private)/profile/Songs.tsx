import s from "@/app/[locale]/(private)/profile/Profile.module.scss";
import { SongsListBlock } from "@/app/[locale]/(private)/profile/_components/songs/SongsList";
import { useTranslations } from "next-intl";

export default function Songs() {
  const t = useTranslations("ProfileInvestor.Songs");

  return (
    <div className={s.subpageWrapper}>
      <p className={s.pageTitle}>{t("title")}</p>
      <SongsListBlock />
    </div>
  );
}
