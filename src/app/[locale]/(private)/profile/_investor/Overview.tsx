"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { useRouter } from "next/navigation";
import { getUserOverview } from "@/services/users/users";
import { toast } from "sonner";
import { LoadingSpinner } from "@/app/[locale]/(private)/profile/_components/LoadingSpinner";
import { OverviewRow } from "@/app/[locale]/(private)/profile/_investor/overview/OverviewRow";
import s from "@/app/[locale]/(private)/profile/Profile.module.scss";
import { ProfileHeader } from "@/app/[locale]/(private)/profile/_components/ProfileHeader/ProfileHeader";
import { SecondBlock } from "@/app/[locale]/(private)/profile/_investor/overview/SecondBlock";
import Image from "next/image";
import { ProjectedEarnings } from "@/app/[locale]/(private)/profile/_components/ProjectedEarnings";

export function Overview() {
  const t = useTranslations("ProfileInvestor.Overview");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [totalInvestedAmount, setTotalInvestedAmount] = useState(0);
  const [totalTokensAmount, setTotalTokensAmount] = useState(0);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        getUserOverview(token)
          .then((res) => {
            const investedAmount = res.data.totalInvestedAmount;
            setTotalInvestedAmount(parseFloat(investedAmount.toFixed(2)));
            const tokensAmount = res.data.totalTokensAmount;
            setTotalTokensAmount(parseFloat(tokensAmount.toFixed(2)));
          })
          .catch((error) => {
            console.log(error);
            toast.error(t("another_error"));
          })
          .finally(() => {
            setLoading(false);
          });
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
          <ProjectedEarnings />
        </div>
        <ProfileHeader />
      </div>
      {loading ? (
        <LoadingSpinner fullHeight={true} />
      ) : (
        <div className={s.contentWrapper}>
          <OverviewRow
            totalInvestedAmount={totalInvestedAmount}
            totalTokensAmount={totalTokensAmount}
          />
          <SecondBlock />
        </div>
      )}
    </div>
  );
}
