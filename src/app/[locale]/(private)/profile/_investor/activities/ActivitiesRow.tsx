import { useTranslations } from "next-intl";
import s from "./Activities.module.scss";

export function ActivitiesRow(props: {
  lastDate: string;
  song: string;
  tokens: number | string;
  invested: number | string;
  status: string;
}) {
  const t = useTranslations("ProfileInvestor.Activities");

  function StatusBlock(props: { status: string }) {
    if (props.status === "WAITING") {
      return (
        <div className={s.waiting}>
          <p>{t("waiting")}</p>
        </div>
      );
    } else if (props.status === "COMPLETE") {
      return (
        <div className={s.complete}>
          <p>{t("completed")}</p>

        </div>
      );
    } else {
      return (
        <div className={s.declined}>
          <p>{t("declined")}</p>
        </div>
      );
    }
  }

  return (
    <div className={s.songRow}>
      <p className={s.songRow_date}>{props.lastDate}</p>
      <p className={s.songRow_song}>{props.song}</p>
      <p className={s.songRow_tokens}>{props.tokens}</p>
      <p className={s.songRow_invested}>${Number(props.invested).toFixed(2)}</p>
      <p className={s.songRow_invested}>
        {StatusBlock({ status: props.status })}
      </p>
    </div>
  );
}
