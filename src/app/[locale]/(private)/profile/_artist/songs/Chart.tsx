"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { useLocale } from "use-intl";
import { ArtistSongsStatistics } from "@/types/types";
import { getMonthForArtistSongs } from "@/services/helpers";

export function SongSalesChart(props: { chartData: ArtistSongsStatistics[] }) {
  const currentLocale = useLocale();

  const renamedData = props.chartData.map(({ month, invested }) => ({
    name: getMonthForArtistSongs(month, currentLocale),
    uv: invested,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart
        data={renamedData}
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
          domain={[0, 80]}
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
            return [`$${value}`];
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
