import s from "./Overview.module.scss";
import Image from "next/image";

export function UserTransactions() {
  return (
    <div className={s.statisticsBlock}>
        <p className={s.title}>Latest users’ transactions </p>
      <div className={s.songHeader}>
        <p className={s.songHeader_date}>Date / Time</p>
        <p className={s.songHeader_song}>Song</p>
        <p className={s.songHeader_tokens}>Tokens</p>
        <p className={s.songHeader_invested}>Amount</p>
      </div>
    </div>
  );
}
