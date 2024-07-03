"use client";

import s from "./Songs.module.scss";
import Image from "next/image";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { songChartDataUK } from "@/data/kalush/songChartData";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";

function RenderLineChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart
        data={songChartDataUK}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="-31.788%"
              stopColor="rgb(246, 96, 31)"
              stopOpacity={0.8}
            />
            <stop
              offset="118.152%"
              stopColor="rgba(21, 22, 23, 0)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid
          vertical={false}
          horizontal
          strokeDasharray="20 10"
          stroke="rgba(255, 255, 255, 0.2)"
        />
        <XAxis
          dataKey="name"
          tick={{
            fill: "rgba(255, 255, 255, 0.5)",
            fontSize: 14,
            fontWeight: 400,
          }}
          padding={{ left: 10 }}
          axisLine={false}
        />
        <YAxis
          tick={{
            fill: "rgba(255, 255, 255, 0.5)",
            fontSize: 14,
            fontWeight: 400,
          }}
          domain={[0, 3000]}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "black",
            color: "white",
            padding: "5px",
            border: "none",
            borderRadius: 8,
          }}
          formatter={(value: ValueType, name: "") => {
            return [`${value}`];
          }}
          label={""}
        />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="rgb(246, 96, 3)"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function SongRow1(props: {
  lastDate: string;
  song: string;
  tokens: number;
  invested: number;
  songLink: string;
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
      <RenderLineChart />
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
