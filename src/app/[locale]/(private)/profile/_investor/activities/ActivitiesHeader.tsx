import s from "./Activities.module.scss";
import { useTranslations } from "next-intl";

export function ActivitiesHeader() {
  const t = useTranslations("ProfileInvestor.Activities");

  return (
    <div className={s.songHeader}>
      <p className={s.songHeader_date}>{t("date")}</p>
      <p className={s.songHeader_song}>{t("song")}</p>
      <p className={s.songHeader_tokens}>{t("tokens")}</p>
      <p className={s.songHeader_invested}>{t("invested")}</p>
        <p className={s.songHeader_status}>{t("status")}</p>
    </div>
  );
}
