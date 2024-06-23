import s from "./SongsList.module.scss";

export function SongHeader() {
  return (
    <div className={s.songHeader}>
      <p className={s.songHeader_date}>Last purchase</p>
      <p className={s.songHeader_song}>Song</p>
      <p className={s.songHeader_tokens}>Tokens</p>
      <p className={s.songHeader_invested}>Invested</p>
    </div>
  );
}
