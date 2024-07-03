"use client";

import s from "./Songs.module.scss";
import Image from "next/image";
import { useState } from "react";
import {RenderLineChart} from "@/app/[locale]/(private)/profile/_artist/songs/Chart";

export function SongRow1(props: {
  lastDate: string;
  song: string;
  tokens: number;
  invested: number;
  songLink: string;
  chartNumber: number
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return modalOpen ? (
    <div className={s.chartState} onClick={() => {
        setModalOpen(!modalOpen);
    }} style={{cursor: "pointer"}}>
      <div className={s.titleBlock}>
        <p className={s.chartState_title}>Sales activity</p>
        <Image
          src={"/profile/icons/header-arrow.svg"}
          alt={"arrow"}
          width={11}
          height={6}
          style={
            modalOpen
              ? { transform: "rotate(180deg)", position: "absolute", right: 0 }
              : { position: "absolute", right: 0 }
          }
        />
      </div>
      <RenderLineChart chartNumber={props.chartNumber} />
    </div>
  ) : (
    <div
      className={s.songRow}
      onClick={() => {
        setModalOpen(!modalOpen);
      }}
    >
      <p className={s.songRow_date}>{props.lastDate}</p>
      <p className={s.songRow_song}>{props.song}</p>
      <p className={s.songRow_tokens}>{props.tokens}</p>
      <p className={s.songRow_invested}>${props.invested}</p>
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
