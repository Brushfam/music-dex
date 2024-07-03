import s from "./Overview.module.scss";
import Image from "next/image";

export function UserTransactions() {
  function TransactionRow(props: {
    date: string;
    song: string;
    tokens: number;
    invested: number;
  }) {
    return (
      <div className={s.transactionsRow}>
        <p className={s.transactionsRow_date}>{props.date}</p>
        <p className={s.transactionsRow_song}>{props.song}</p>
        <p className={s.transactionsRow_tokens}>{props.tokens}</p>
        <p className={s.transactionsRow_invested}>${props.invested}</p>
      </div>
    );
  }

  return (
    <div className={s.transactionsBlock}>
      <p className={s.title}>Latest users’ transactions </p>
      <div className={s.songHeader}>
        <p className={s.songHeader_date}>Date / Time</p>
        <p className={s.songHeader_song}>Song</p>
        <p className={s.songHeader_tokens}>Tokens</p>
        <p className={s.songHeader_invested}>Amount</p>
      </div>
      <div className={s.transactionsBlockList}>
        <TransactionRow
          song={"Стіни"}
          date={"06/05/2024 11:45"}
          tokens={3}
          invested={9}
        />
        <TransactionRow
          song={"Зорі"}
          date={"06/05/2024 02:32"}
          tokens={15}
          invested={45}
        />
        <TransactionRow
          song={"Зорі"}
          date={"04/05/2024 23:11"}
          tokens={2}
          invested={6}
        />
        <TransactionRow
          song={"Стіни"}
          date={"02/05/2024 12:56"}
          tokens={18}
          invested={54}
        />
        <TransactionRow
          song={"Стіни"}
          date={"01/05/2024 12:43"}
          tokens={3}
          invested={9}
        />
        <TransactionRow
          song={"Додому"}
          date={"01/05/2024 09:08"}
          tokens={30}
          invested={90}
        />
      </div>
    </div>
  );
}
