"use client";

import s from "./Statistics.module.scss";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useLocale } from "use-intl";
import { StreamingChart } from "@/app/[locale]/(public)/tracks/_components/Statistics/StreamingChart";

export function Statistics() {
  const t = useTranslations("Tracks.Statistics");
  const currentLocale = useLocale();
  const isEN = currentLocale === "en";

  function TotalStreams() {
    return (
      <div className={s.statistics}>
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

  function ChartBlock(props: { platform: string }) {
    return (
      <div className={s.cardBlockWrapper}>
        <div className={s.chartBlock}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Image
              src={"/tracks/statistics/" + props.platform + ".svg"}
              alt={"spotify"}
              width={28}
              height={28}
            />
            <p
              style={{
                fontSize: 16,
                fontWeight: 500,
                textTransform: "uppercase",
              }}
            >
              {props.platform}
            </p>
          </div>
          <div className={s.chartBlock_summary}>
            <p className={s.chartBlock_summary_text1}>
              {props.platform === "spotify" ? "40,780" : "37,445"}
            </p>
            <p className={s.chartBlock_summary_text2}>
              {isEN ? "Last 30 days" : "Останні 30 днів"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={s.statisticsWrapper}>
      <TotalStreams />
      <div className={s.chartWrapper}>
        <ChartBlock platform={"spotify"} />
        <StreamingChart platform={"spotify"} />
      </div>
      <div className={s.chartWrapper}>
        <ChartBlock platform={"youtube"} />
        <StreamingChart platform={"youtube"} />
      </div>
    </div>
  );
}
