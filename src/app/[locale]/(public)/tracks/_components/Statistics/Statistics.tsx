import s from "./Statistics.module.scss";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Statistics() {
  const t = useTranslations("Tracks.Statistics");

  return (
    <div className={s.statisticsWrapper}>
      <div className={s.statisticColumn}>
        <div className={s.statisticItem}>
          <div className={s.statisticItem_textBlock}>
            <p className={s.statisticItem_title}>{t("title1")}</p>
            <p className={s.statisticItem_number}>100,000</p>
          </div>
          <Image
            src={"/tracks/royalties-spotify.svg"}
            alt={"spotify"}
            width={94}
            height={94}
          />
        </div>
        <div className={s.statisticItem}>
          <div className={s.statisticItem_textBlock}>
            <p className={s.statisticItem_title}>{t("title2")}</p>
            <p className={s.statisticItem_number}>100,000</p>
          </div>
          <Image
            src={"/tracks/royalties-youtube.svg"}
            alt={"youtube"}
            width={94}
            height={94}
          />
        </div>
      </div>
      <div className={s.statisticColumn}>
        <div className={s.statisticItem}>
          <div className={s.statisticItem_textBlock}>
            <p className={s.statisticItem_title}>{t("title3")}</p>
            <p className={s.statisticItem_number}>100,000</p>
          </div>
          <Image
            src={"/tracks/royalties-apple-music.svg"}
            alt={"apple"}
            width={94}
            height={94}
          />
        </div>
        <div className={s.statisticItem}>
          <div className={s.statisticItem_textBlock}>
            <p className={s.statisticItem_title}>{t("title4")}</p>
            <p className={s.statisticItem_number}>100,000</p>
          </div>
          <Image
            src={"/tracks/royalties-radio.svg"}
            alt={"radio"}
            width={94}
            height={94}
          />
        </div>
      </div>
    </div>
  );
}
