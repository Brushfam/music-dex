"use client";

import profileStyles from "@/app/[locale]/(private)/profile/Profile.module.scss";
import s from "@/app/[locale]/(private)/profile/_investor/activities/Activities.module.scss";
import { ActivitiesHeader } from "@/app/[locale]/(private)/profile/_investor/activities/ActivitiesHeader";
import { ActivitiesRow } from "@/app/[locale]/(private)/profile/_investor/activities/ActivitiesRow";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { getInvestorActivities } from "@/services/users/investors/investors";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../_components/LoadingSpinner";
import { ProfileHeader } from "../../_components/ProfileHeader/ProfileHeader";

interface ActivitiesData {
  date: string;
  name: string;
  tokens: number | string;
  amount: number | string;
  currency: string;
  status: string;
  link: string;
}

const data = [
  {
    dateTime: "18/11/2024 16:20",
    value: "ETH",
    name: "Ethereum",
    amount: "$1000",
  },
  {
    dateTime: "18/11/2024 16:20",
    value: "ETH",
    name: "Ethereum",
    amount: "$1000",
  },
  {
    dateTime: "18/11/2024 16:20",
    value: "ETH",
    name: "Ethereum",
    amount: "$1000",
  },
  {
    dateTime: "18/11/2024 16:20",
    value: "ETH",
    name: "Ethereum",
    amount: "$1000",
  },
  {
    dateTime: "18/11/2024 16:20",
    value: "ETH",
    name: "Ethereum",
    amount: "$1000",
  },
];

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
        getInvestorActivities(token)
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
                    Number(data[i].token_price)
                  );
              const tokens = isDeclined ? "-" : tokenAmount;
              actList.push({
                date: formatDate(data[i].purchase_timestamp),
                name: data[i].song_name,
                amount: amount,
                tokens: tokens,
                currency: data[i].currency,
                status: data[i].payment_status,
                link: data[i].order_url,
              });
            }
            setActivitiesList([
              {
                date: "2000-10-10",
                name: "test",
                amount: 200,
                tokens: "sadasdas",
                currency: "22ds",
                status: "pending",
                link: "dsds",
              },
            ]);
            // setActivitiesList(actList);
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
          <ActivitiesRow
            key={index}
            lastDate={act.date}
            song={act.name}
            tokens={act.tokens}
            invested={act.amount}
            status={act.status}
            songLink={act.link}
          />
        );
      })
    ) : (
      <NoActivitiesBlock />
    );
  }

  return (
    <div className={profileStyles.subpageWrapper}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p className={profileStyles.pageTitle}>{t("title")}</p>
        </div>
        <ProfileHeader />
      </div>
      {loading ? (
        <LoadingSpinner fullHeight={true} />
      ) : (
        <div className={profileStyles.contentWrapper}>
          <div className={s.inputOutputContainer}>
            <div className={s.container}>
              <h2>{t("input")}</h2>
              <div className={s.wrapper}>
                <div className={s.inputOutputHeader}>
                  <p>{t("dateTime")}</p>
                  <p>{t("value")}</p>
                  <p className={s.inputOutputHeader_amount}>{t("amount")}</p>
                </div>
                <div className={s.inputOutputRow}>
                  <div>18/11/2024 16:20</div>
                  <div>
                    <div>ETH</div>
                    <div className={s.inputOutputRow_value}>Ethereum</div>
                  </div>
                  <div className={s.inputOutputRow_amount}>$1000</div>
                </div>
              </div>
            </div>
            <div className={s.container}>
              <h2>{t("output")}</h2>
              <div className={s.wrapper}>
                <div className={s.inputOutputHeader}>
                  <p>{t("dateTime")}</p>
                  <p>{t("value")}</p>
                  <p className={s.inputOutputHeader_amount}>{t("amount")}</p>
                </div>
                <div className={s.inputOutputRow}>
                  <div>18/11/2024 16:20</div>
                  <div>
                    <div>ETH</div>
                    <div className={s.inputOutputRowValue}>Ethereum</div>
                  </div>
                  <div className={s.inputOutputRow_amount}>$1000</div>
                </div>
              </div>
            </div>
          </div>
          <div className={s.activitiesWrapper}>
            <p className={s.titleBlock_text}>{t("recentPurchases")}</p>
            <div className={s.wrapper}>
              {activitiesList.length ? <ActivitiesHeader /> : null}
              <ActivitiesList />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
