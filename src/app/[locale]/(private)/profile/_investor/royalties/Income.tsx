import { SampleRoyaltiesChart } from "@/app/[locale]/(private)/profile/_investor/royalties/SampleRoyaltiesChart";
import { useTranslations } from "next-intl";
import s from "./Royalties.module.scss";

export function Income() {
  const t = useTranslations("ProfileInvestor.Royalties");
  return (
    <div className={s.income}>
      <p className={s.title}>{t("statistics")}</p>
      <p className={s.sample_text}>{t("sample_statistics")}</p>
      <SampleRoyaltiesChart />
    </div>
  );
}
