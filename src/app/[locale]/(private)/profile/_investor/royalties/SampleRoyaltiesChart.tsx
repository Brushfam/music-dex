"use client";

import { sampleRoyaltiesData } from "@/data/profile/sampleData";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  YAxis,
} from "recharts";

export function SampleRoyaltiesChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart
        data={sampleRoyaltiesData}
        margin={{ top: 15, right: 0, bottom: 5, left: -30 }}
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
          domain={[0, 80]}
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
