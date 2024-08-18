"use client";

import { ChartStreamsData } from "@/app/[locale]/(public)/tracks/_components/Statistics/Statistics";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export function StreamingChart(props: {
  data: ChartStreamsData[];
  platform: string;
  maxStreams: number;
}) {
  const yAxisTickFormatter = (value: number) => `${value}`;
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart
        data={props.data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <CartesianGrid
          vertical={false}
          horizontal
          strokeDasharray="20 10"
          stroke="rgba(255, 255, 255, 0.2)"
        />
        <YAxis
          tick={{
            fill: "rgba(255, 255, 255, 0.5)",
            fontSize: 14,
            fontWeight: 400,
          }}
          domain={[0, props.maxStreams]}
          axisLine={false}
          tickFormatter={yAxisTickFormatter}
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
        <Line
          type="monotone"
          dataKey="uv"
          stroke="rgb(246, 96, 3)"
          dot={false}
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
