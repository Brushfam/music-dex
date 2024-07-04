import { useTranslations } from "next-intl";
import s from "./Royalties.module.scss";
import { RoyaltiesChart } from "@/app/[locale]/(public)/tracks/_components/Royalties/RoyaltiesChart";

export function Royalties() {
  const t = useTranslations("Tracks.Royalties");

  return (
    <div className={s.royalties}>
      <p className={s.title}>{t("title")}</p>
      <div className={s.history}>
        <RoyaltiesChart />
      </div>
    </div>
  );
}
