"use client";

import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { getUserRoyaltiesStatistics } from "@/services/users/users";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { toast } from "sonner";

const monthsNames = [
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
];

export function SampleRoyaltiesChart() {
  const t = useTranslations("ProfileInvestor.Royalties");

  const [sampleRoyaltiesData, setSampleRoyaltiesData] = useState<
    { name: string; uv: number }[]
  >([]);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          setLoading(true);

          const token = await user.getIdToken();

          const res = await getUserRoyaltiesStatistics(token);

          setSampleRoyaltiesData(
            monthsNames.map((month) => {
              const item = res.data.find((i: any) => i.month === month);
              if (item) {
                return { name: month, uv: item.amount };
              }
              return { name: month, uv: 0 };
            })
          );
        } catch (e) {
          console.log(e);
          toast.error(t("another_error"));
        } finally {
          setLoading(false);
        }
      } else {
        router.replace("/en/auth/login?expired-session=true");
      }
    });
  }, [router, t]);

  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart
        data={sampleRoyaltiesData}
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
