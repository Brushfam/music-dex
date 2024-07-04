"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { royaltiesDataEN, royaltiesDataUA } from "@/data/kalush/royaltiesData";
import { useLocale } from "use-intl";

const CustomBar = (props: any) => {
  const { fill, x, y, width, height } = props;
  const radius = 10; // Adjust the radius as needed
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        rx={radius}
        ry={radius}
      />
      <rect
        x={x}
        y={y + radius}
        width={width}
        height={height - radius}
        fill={fill}
      />
    </g>
  );
};

export function RoyaltiesChart() {
  const currentLocale = useLocale();
  const yAxisTickFormatter = (value: number) => `$${value}`;
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={currentLocale === "en" ? royaltiesDataEN : royaltiesDataUA}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        barCategoryGap={20}
        barGap={10}
      >
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
          axisLine={false}
        />
        <YAxis
          tick={{
            fill: "rgba(255, 255, 255, 0.5)",
            fontSize: 14,
            fontWeight: 400,
          }}
          axisLine={false}
          tickFormatter={yAxisTickFormatter}
        />
        <Bar
          dataKey="uv"
          fill="rgb(246, 96, 3)"
          barSize={16}
          shape={CustomBar}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
