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
import {SecondBlock} from "@/app/[locale]/(private)/profile/_investor/overview/SecondBlock";

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
            setTotalInvestedAmount(res.data.totalInvestedAmount);
            setTotalTokensAmount(res.data.totalTokensAmount);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Something went wrong");
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        router.replace("/en/auth/login?expired-session=true");
      }
    });
  }, [router]);

  return (
    <div className={s.subpageWrapper}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <p className={s.pageTitle}>{t("title")}</p>
        <ProfileHeader />
      </div>
      {loading ? (
        <LoadingSpinner fullHeight={true} />
      ) : (
        <div className={s.overviewWrapper}>
          <OverviewRow
            totalInvestedAmount={Number(totalInvestedAmount)}
            totalTokensAmount={Number(totalTokensAmount)}
          />
            <SecondBlock/>
        </div>
      )}
    </div>
  );
}
