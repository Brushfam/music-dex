"use client";

import s from "./Statistics.module.scss";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useLocale } from "use-intl";
import { StreamingChart } from "@/app/[locale]/(public)/tracks/_components/Statistics/StreamingChart";
import { useEffect, useState } from "react";
import { getSongStreams } from "@/services/songs";
import { LoadingSpinner } from "@/app/[locale]/(private)/_components/LoadingSpinner";
import {getMonthForStreamStatistics} from "@/services/helpers";

interface StreamsData {
  month: string;
  platform: string;
  streams: number;
}

export interface ChartStreamsData {
  name: string;
  uv: number;
}

export function Statistics(props: { songId: number }) {
  const t = useTranslations("Tracks.Statistics");
  const currentLocale = useLocale();
  const [chartData, setChartData] = useState<undefined | ChartStreamsData[]>(
    undefined,
  );

  useEffect(() => {
    getSongStreams(props.songId, "Spotify")
      .then((response) => {
        let list: ChartStreamsData[] = [];
        // get data for 6 months
        const streamsDataList =
          response.data.result.length > 6
            ? response.data.result.slice(0, 6)
            : response.data.result;
        streamsDataList.forEach((data: StreamsData) => {
          list.push({
            name: getMonthForStreamStatistics(data.month, currentLocale),
            uv: data.streams,
          });
        });
        setChartData(list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentLocale, props.songId]);

  function ChartTitleBlock(props: { platform: string }) {
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
              src={"/tracks/statistics-chart/" + props.platform + ".svg"}
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
        </div>
      </div>
    );
  }

  return (
    <div className={s.statistics}>
      <div className={s.chartWrapper}>
        <ChartTitleBlock platform={"spotify"} />
        {chartData ? (
          <StreamingChart
            data={chartData}
            platform={"spotify"}
            maxStreams={8000}
          />
        ) : (
          <LoadingSpinner fullHeight={false} />
        )}
      </div>
    </div>
  );
}
