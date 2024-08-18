import { useTranslations } from "next-intl";
import s from "./Songs.module.scss";

export function SongHeader() {
  const t = useTranslations("ProfileArtist.Songs");

  return (
    <div className={s.songHeader}>
      <p className={s.songHeader_date}>{t("listing_date")}</p>
      <p className={s.songHeader_song}>{t("song")}</p>
      <p className={s.songHeader_tokens}>{t("tokens")}</p>
      <p className={s.songHeader_invested}>{t("total")}</p>
    </div>
  );
}
