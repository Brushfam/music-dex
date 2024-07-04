"use client";

import {
  Area,
  Line,
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import {
  streamsLineChartDataSpotify,
  streamsLineChartDataYoutube,
} from "@/data/kalush/streamsLineChartData";

export function StreamingChart(props: { platform: string }) {
  const yAxisTickFormatter = (value: number) => `${value}K`;
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart
        data={
          props.platform === "spotify"
            ? streamsLineChartDataSpotify
            : streamsLineChartDataYoutube
        }
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
          domain={[0, 20]}
          axisLine={false}
          tickFormatter={yAxisTickFormatter}
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
