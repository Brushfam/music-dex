"use client";

import { LoadingSpinner } from "@/app/[locale]/(private)/_components/LoadingSpinner";
import { ProfileHeader } from "@/app/[locale]/(private)/_components/ProfileHeader/ProfileHeader";
import { OverviewRow } from "@/app/[locale]/(private)/profile/_investor/overview/OverviewRow";
import { SecondBlock } from "@/app/[locale]/(private)/profile/_investor/overview/SecondBlock";
import s from "@/app/[locale]/(private)/profile/Profile.module.scss";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import {
  getUserOverview,
  getUserSongs,
  getUserTotalEarnings,
} from "@/services/users/users";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function Overview() {
  const t = useTranslations("ProfileInvestor.Overview");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [totalInvestedAmount, setTotalInvestedAmount] = useState(0);
  const [totalTokensAmount, setTotalTokensAmount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          setLoading(true);

          const token = await user.getIdToken();
          const [overviewRes, songsRes, totalEarningsRes] = await Promise.all([
            getUserOverview(token),
            getUserSongs(token),
            getUserTotalEarnings(token),
          ]);

          const investedAmount = overviewRes.data.totalInvestedAmount;
          setTotalInvestedAmount(parseFloat(investedAmount.toFixed(2)));

          const tokensAmount = overviewRes.data.totalTokensAmount;
          setTotalTokensAmount(parseFloat(tokensAmount.toFixed(2)));

          setSongs(songsRes.data.songs);

          setTotalEarnings(totalEarningsRes?.data?.amount);
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
    <div className={s.subpageWrapper}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p className={s.pageTitle}>{t("title")}</p>
        </div>
        <ProfileHeader />
      </div>
      {loading ? (
        <LoadingSpinner fullHeight={true} />
      ) : (
        <div className={s.contentWrapper}>
          <OverviewRow
            totalEarnings={totalEarnings}
            totalInvestedAmount={totalInvestedAmount}
            totalTokensAmount={totalTokensAmount}
            songs={songs}
          />
          <SecondBlock songs={songs} />
        </div>
      )}
    </div>
  );
}
