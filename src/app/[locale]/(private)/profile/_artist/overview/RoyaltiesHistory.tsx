import s from "./Overview.module.scss";

export function RoyaltiesHistory() {
  function RoyaltiesRow(props: {
    date: string;
    period: string;
    song: string;
    amount: number;
  }) {
    return (
      <div className={s.royaltiesHistoryRow}>
        <p className={s.royaltiesHistoryRow_date}>{props.date}</p>
        <p className={s.royaltiesHistoryRow_song}>{props.period}</p>
        <p className={s.royaltiesHistoryRow_tokens}>{props.song}</p>
        <p className={s.royaltiesHistoryRow_invested}>${props.amount}</p>
      </div>
    );
  }

  return (
    <div className={s.royaltiesHistory}>
      <p className={s.title}>Royalty payments</p>
      <div className={s.royaltiesHistoryHeader}>
        <p className={s.royaltiesHistoryHeader_date}>Date</p>
        <p className={s.royaltiesHistoryHeader_song}>Period covered</p>
        <p className={s.royaltiesHistoryHeader_tokens}>Song</p>
        <p className={s.royaltiesHistoryHeader_invested}>Amount</p>
      </div>
      <div className={s.royaltiesHistoryList}>
        <RoyaltiesRow
          date={"01/03/2024"}
          period={"February"}
          song={"Стіни"}
          amount={211}
        />
        <RoyaltiesRow
          date={"01/03/2024 11:45"}
          period={"February"}
          song={"Зорі"}
          amount={211}
        />
        <RoyaltiesRow
          date={"01/03/2024 11:45"}
          period={"February"}
          song={"Додому"}
          amount={211}
        />
        <RoyaltiesRow
          date={"01/02/2024 11:45"}
          period={"January"}
          song={"Стіни"}
          amount={211}
        />
        <RoyaltiesRow
          date={"01/02/2024 11:45"}
          period={"January"}
          song={"Зорі"}
          amount={211}
        />
      </div>
    </div>
  );
}
