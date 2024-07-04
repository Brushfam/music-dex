import s from "./Overview.module.scss";
import {useTranslations} from "next-intl";

export function RoyaltiesHistory() {
    const t = useTranslations("ProfileArtist.Overview");
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
      <p className={s.title}>{t("royalty_title")}</p>
      <div className={s.royaltiesHistoryHeader}>
        <p className={s.royaltiesHistoryHeader_date}>{t("date")}</p>
        <p className={s.royaltiesHistoryHeader_song}>{t("period")}</p>
        <p className={s.royaltiesHistoryHeader_tokens}>{t("song")}</p>
        <p className={s.royaltiesHistoryHeader_invested}>{t("amount")}</p>
      </div>
      <div className={s.royaltiesHistoryList}>
        <RoyaltiesRow
          date={"01/03/2024"}
          period={t("february")}
          song={"Стіни"}
          amount={211}
        />
        <RoyaltiesRow
          date={"01/03/2024 11:45"}
          period={t("february")}
          song={"Зорі"}
          amount={211}
        />
        <RoyaltiesRow
          date={"01/03/2024 11:45"}
          period={t("february")}
          song={"Додому"}
          amount={211}
        />
        <RoyaltiesRow
          date={"01/02/2024 11:45"}
          period={t("january")}
          song={"Стіни"}
          amount={211}
        />
        <RoyaltiesRow
          date={"01/02/2024 11:45"}
          period={t("january")}
          song={"Зорі"}
          amount={211}
        />
      </div>
    </div>
  );
}
