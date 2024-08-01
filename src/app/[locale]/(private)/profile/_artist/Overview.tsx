"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { OverviewRow } from "@/app/[locale]/(private)/profile/_artist/overview/OverviewRow";
import s from "@/app/[locale]/(private)/profile/Profile.module.scss";
import { ProfileHeader } from "@/app/[locale]/(private)/profile/_components/ProfileHeader/ProfileHeader";
import { useRouter } from "next/navigation";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { getUserOverview } from "@/services/users/users";
import { toast } from "sonner";
import { LoadingSpinner } from "@/app/[locale]/(private)/profile/_components/LoadingSpinner";
import { ArtistPurchaseHistory } from "@/types/types";
import { UserTransactions } from "@/app/[locale]/(private)/profile/_artist/overview/UserTransactions";
import { RoyaltiesHistory } from "@/app/[locale]/(private)/profile/_artist/overview/PaymentHistory";

export function Overview() {
  const t = useTranslations("ProfileArtist.Overview");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [totalInvestedAmount, setTotalInvestedAmount] = useState(0);
  const [totalTokensAmount, setTotalTokensAmount] = useState(0);
  const [purchaseHistory, setPurchaseHistory] = useState<
    ArtistPurchaseHistory[]
  >([]);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        getUserOverview(token)
          .then((res) => {
              console.log(res.data)
            const investedAmount = res.data.totalInvestedAmount;
            setTotalInvestedAmount(parseFloat(investedAmount.toFixed(2)));
            const tokensAmount = res.data.totalTokensAmount;
            setTotalTokensAmount(parseFloat(tokensAmount.toFixed(2)));
            setPurchaseHistory(res.data.history);
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
        }}
      >
        <p className={s.pageTitle}>{t("title")}</p>
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
          <div className={s.secondArtistOverviewBlock}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                width: "100%",
              }}
            >
              <UserTransactions history={purchaseHistory} />
              <RoyaltiesHistory />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
