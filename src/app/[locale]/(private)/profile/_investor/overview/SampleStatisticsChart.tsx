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
import {investorStatisticsDataEN, investorStatisticsDataUK} from "@/data/profile/sampleData";

export function SampleStatisticsChart() {
  const currentLocale = useLocale();
  const data = currentLocale === "en" ? investorStatisticsDataEN : investorStatisticsDataUK

  return (
    <ResponsiveContainer height={200}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 0, bottom: 0, left: -28 }}
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
          domain={[0, 100]}
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
