import s from "./SongsList.module.scss";
import { useTranslations } from "next-intl";

export function SongHeader() {
  const t = useTranslations("ProfileInvestor.Songs");

  return (
    <div className={s.songHeader}>
      <p className={s.songHeader_date}>{t("last_purchase")}</p>
      <p className={s.songHeader_song}>{t("song")}</p>
      <p className={s.songHeader_tokens}>{t("tokens")}</p>
      <p className={s.songHeader_invested}>{t("invested")}</p>
    </div>
  );
}
