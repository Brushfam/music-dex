"use client";

import { SongSalesChart } from "@/app/[locale]/(private)/profile/_artist/songs/Chart";
import { ArtistSong } from "@/types/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import s from "./Songs.module.scss";

export function SongRow(props: { songData: ArtistSong }) {
  const t = useTranslations("ProfileArtist.Songs");
  const [chartOpen, setChartOpen] = useState(false);

  return chartOpen ? (
    <div
      className={s.chartState}
      onClick={() => {
        setChartOpen(!chartOpen);
      }}
      style={{ cursor: "pointer" }}
    >
      <div className={s.titleBlock}>
        <p className={s.chartState_title}>{t("sales_activity")}</p>
        <Image
          src={"/profile/icons/header-arrow.svg"}
          alt={"arrow"}
          width={11}
          height={6}
          style={
            chartOpen
              ? { transform: "rotate(180deg)", position: "absolute", right: 0 }
              : { position: "absolute", right: 0 }
          }
        />
      </div>
      <SongSalesChart chartData={props.songData.statistics} />
    </div>
  ) : (
    <div
      className={s.songRow}
      onClick={() => {
        setChartOpen(!chartOpen);
      }}
    >
      <p className={s.songRow_date}>{props.songData.listeningDate}</p>
      <p className={s.songRow_song}>{props.songData.songName}</p>
      <p className={s.songRow_tokens}>{props.songData.totalAmount}</p>
      <p className={s.songRow_invested}>${props.songData.totalInvested}</p>
      <Image
        src={"/profile/icons/header-arrow.svg"}
        alt={"arrow"}
        width={11}
        height={6}
        style={{ position: "absolute", right: 20 }}
      />
    </div>
  );
}
