"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  YAxis,
} from "recharts";
const url = process.env.NEXT_PUBLIC_SERVERTEST_URL;

export function SampleRoyaltiesChart() {
  const [sampleRoyaltiesData, setSampleRoyaltiesData] = useState([]);

  useEffect(() => {
    const fetchRoyaltiesData = async () => {
      try {
        const response = await fetch(url + "/users/royalties/statistics");
        if (response.ok) {
          const data = await response.json();
          const transformedData = data.map((item: any) => ({
            name: item.month,
            uv: parseFloat(item.amount),
          }));
          setSampleRoyaltiesData(transformedData);
        } else {
          console.error("Failed to fetch royalties:", response.status);
        }
      } catch (error) {
        console.error("Error fetching royalties data:", error);
      }
    };

    fetchRoyaltiesData();
  }, []);

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
          domain={[0, 80]} // Убедитесь, что это значение подходит для вашего диапазона данных
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
