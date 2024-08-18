import { SampleStatisticsChart } from "@/app/[locale]/(private)/profile/_investor/overview/SampleStatisticsChart";
import { useTranslations } from "next-intl";
import s from "./Overview.module.scss";

export function Statistics() {
  const t = useTranslations("ProfileInvestor.Overview");
  return (
    <div className={s.statisticsBlock}>
      <p className={s.title}>{t("statistics")}</p>
      <p className={s.sample_text}>{t("sample_statistics")}</p>
      <SampleStatisticsChart />
    </div>
  );
}
