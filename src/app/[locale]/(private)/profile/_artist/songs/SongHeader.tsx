import s from "./Songs.module.scss";
import { useTranslations } from "next-intl";

export function SongHeader() {
  const t = useTranslations("ProfileInvestor.Songs");

  return (
    <div className={s.songHeader}>
      <p className={s.songHeader_date}>Listing date</p>
      <p className={s.songHeader_song}>Song</p>
      <p className={s.songHeader_tokens}>Tokens</p>
      <p className={s.songHeader_invested}>Total received</p>
    </div>
  );
}
