import s from "./Overview.module.scss";
import Image from "next/image";
import {useTranslations} from "next-intl";

export function Statistics() {
    const t = useTranslations("ProfileInvestor.Overview");
  return (
    <div className={s.statisticsBlock}>
      <p className={s.title}>{t("statistics")}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
            width: "100%",
            height: "100%"
        }}
      >
        <Image
          src={"/profile/empty-list/statistics.svg"}
          alt={"icon"}
          width={50}
          height={50}
        />
        <p className={s.statisticsBlock_text1}>
          The statistics of your purchases will be shown here
        </p>
        <p className={s.statisticsBlock_text2}>Choose a song to invest</p>
      </div>
    </div>
  );
}
