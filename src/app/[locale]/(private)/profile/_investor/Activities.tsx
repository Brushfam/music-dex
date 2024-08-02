"use client";

import { PageWrapper } from "@/app/[locale]/(private)/profile/PageWrapper";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { getUserActivities } from "@/services/users/investors/investors";
import s from "@/app/[locale]/(private)/profile/_investor/activities/Activities.module.scss";
import { ActivitiesHeader } from "@/app/[locale]/(private)/profile/_investor/activities/ActivitiesHeader";
import { ActivitiesRow } from "@/app/[locale]/(private)/profile/_investor/activities/ActivitiesRow";

interface ActivitiesData {
  date: string;
  name: string;
  tokens: number | string;
  amount: number | string;
  currency: string;
  status: string;
  link: string
}

export default function Activities() {
  const t = useTranslations("ProfileInvestor.Activities");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activitiesList, setActivitiesList] = useState<ActivitiesData[]>([]);

  function formatDate(date: string) {
    const timestamp = new Date(date);
    return `${timestamp.getDate()}/${timestamp.getMonth() + 1}/${timestamp.getFullYear()}`;
  }

  useEffect(() => {
    function computeInvestedAmount(tokenAmount: number, tokenPrice: number) {
      const floatAmount = tokenAmount * tokenPrice;
      return parseFloat(floatAmount.toFixed(2));
    }

    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        getUserActivities(token)
          .then((res) => {
            const data = res.data.purchaseHistory;
            let actList: ActivitiesData[] = [];
            for (let i = 0; i < data.length; ++i) {
              const tokenAmount = Number(data[i].token_amount);
              const isDeclined = data[i].payment_status === "DECLINED";
              const amount = isDeclined
                ? "-"
                : computeInvestedAmount(
                    tokenAmount,
                    Number(data[i].token_price),
                  );
              const tokens = isDeclined ? "-" : tokenAmount;
              actList.push({
                date: formatDate(data[i].purchase_timestamp),
                name: "Дилер",
                amount: amount,
                tokens: tokens,
                currency: data[i].currency,
                status: data[i].payment_status,
                link: data[i].order_url
              });
            }
            setActivitiesList(actList);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        router.replace("/en/auth/login?expired-session=true");
      }
    });
  }, [router]);

  function NoActivitiesBlock() {
    return (
      <div className={s.noSongBlock}>
        <p className={s.noSongBlock_title}>{t("no_activities")}</p>
      </div>
    );
  }

  function ActivitiesList() {
    return activitiesList.length ? (
      activitiesList.map((act, index) => {
        return (
          <div
            key={index.toString()}
            style={{ display: "flex", flexDirection: "column", minWidth: 530 }}
          >
            <ActivitiesRow
              lastDate={act.date}
              song={"Дилер"}
              tokens={act.tokens}
              invested={act.amount}
              status={act.status}
              songLink={act.link}
            />
          </div>
        );
      })
    ) : (
      <NoActivitiesBlock />
    );
  }

  return (
    <PageWrapper title={t("title")} height={"auto"} loading={loading}>
      <div className={s.activitiesWrapper}>
        <p className={s.titleBlock_text}>{t("list_of_activities")}</p>
        {activitiesList.length ? <ActivitiesHeader /> : null}
        <ActivitiesList />
      </div>
    </PageWrapper>
  );
}
