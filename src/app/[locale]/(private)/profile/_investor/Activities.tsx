"use client";

import profileStyles from "@/app/[locale]/(private)/profile/Profile.module.scss";
import s from "@/app/[locale]/(private)/profile/_investor/activities/Activities.module.scss";
import { ActivitiesHeader } from "@/app/[locale]/(private)/profile/_investor/activities/ActivitiesHeader";
import { ActivitiesRow } from "@/app/[locale]/(private)/profile/_investor/activities/ActivitiesRow";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import {
  getInvoices,
  getReplenishments,
  getWithdrawals,
} from "@/services/users/users";
import { IInvoice, ITransaction } from "@/types/types";
import dayjs from "dayjs";
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

export default function Activities() {
  const t = useTranslations("ProfileInvestor.Activities");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activitiesList, setActivitiesList] = useState<ActivitiesData[]>([]);
  const [replenishmentsList, setReplenishmentsList] = useState<ITransaction[]>(
    []
  );
  const [withdrawalsList, setWithdrawalsList] = useState<ITransaction[]>([]);
  const [invoicesList, setInvoicesList] = useState<IInvoice[]>([]);

  function formatDate(date: string) {
    const timestamp = new Date(date);
    return `${timestamp.getDate()}/${timestamp.getMonth() + 1}/${timestamp.getFullYear()}`;
  }
  function StatusBlock(props: { status: string }) {
    if (props.status === "waiting") {
      return (
        <div className={s.waiting}>
          <p>{t("waiting")}</p>
        </div>
      );
    } else if (props.status === "success") {
      return (
        <div className={s.complete}>
          <p>{t("completed")}</p>
        </div>
      );
    } else {
      return (
        <div className={s.declined}>
          <p>{t("declined")}</p>
        </div>
      );
    }
  }
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          setLoading(true);
          const token = await user.getIdToken();
          const [replenishmentsRes, withdrawalsRes, invoicesRes] =
            await Promise.all([
              getReplenishments(token),
              getWithdrawals(token),
              getInvoices(token),
            ]);

          setReplenishmentsList(replenishmentsRes.data);
          setWithdrawalsList(withdrawalsRes.data);
          setInvoicesList(invoicesRes.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
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
    return invoicesList.length ? (
      invoicesList.map((act, index) => {
        return (
          <ActivitiesRow
            key={index}
            lastDate={dayjs(act.purchase_timestamp).format("DD/MM/YYYY HH:mm")}
            song={act.song?.title}
            tokens={act.token_amount}
            invested={Number(act.token_amount) * Number(act.token_price)}
            status={act.payment_status}
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
              {replenishmentsList.length > 0 ? (
                <div className={s.wrapper}>
                  <div className={s.inputOutputHeader}>
                    <p>{t("dateTime")}</p>
                    <p>{t("value")}</p>
                    <p>{t("amount")}</p>
                    <p className={s.inputOutputHeader_status}>{t("status")}</p>
                  </div>
                  {replenishmentsList.map((replenishment, index) => {
                    return (
                      <div className={s.inputOutputRow} key={index}>
                        <div>
                          {dayjs(replenishment.created_at).format(
                            "DD/MM/YYYY HH:mm"
                          )}
                        </div>
                        <div>
                          <div>{replenishment.currency.symbol}</div>
                          <div className={s.inputOutputRow_value}>
                            {replenishment.currency.name}
                          </div>
                        </div>
                        <div className={s.inputOutputRow_amount}>
                          {Number(replenishment.amount).toFixed(2)}
                        </div>
                        <div className={s.inputOutputRow_status}>
                          {StatusBlock(replenishment)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={s.noSongBlock}>
                  <p className={s.noSongBlock_title}>{t("no_input")}</p>
                </div>
              )}
            </div>
            <div className={s.container}>
              <h2>{t("output")}</h2>
              {withdrawalsList.length > 0 ? (
                <div className={s.wrapper}>
                  <div className={s.inputOutputHeader}>
                    <p>{t("dateTime")}</p>
                    <p>{t("value")}</p>
                    <p>{t("amount")}</p>
                    <p className={s.inputOutputHeader_status}>{t("status")}</p>
                  </div>

                  {withdrawalsList.map((withdrawal, index) => {
                    return (
                      <div className={s.inputOutputRow} key={index}>
                        <div>
                          {dayjs(withdrawal.created_at).format(
                            "DD/MM/YYYY HH:mm"
                          )}
                        </div>
                        <div>
                          <div>{withdrawal.currency.symbol}</div>
                          <div className={s.inputOutputRow_value}>
                            {withdrawal.currency.name}
                          </div>
                        </div>
                        <div className={s.inputOutputRow_amount}>
                          {Number(withdrawal.amount).toFixed(2)}
                        </div>
                        <div className={s.inputOutputRow_status}>
                          {StatusBlock(withdrawal)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={s.noSongBlock}>
                  <p className={s.noSongBlock_title}>{t("no_output")}</p>
                </div>
              )}
            </div>
          </div>
          <div className={s.activitiesWrapper}>
            <p className={s.titleBlock_text}>{t("recentPurchases")}</p>
            <div className={s.wrapper}>
              {invoicesList.length ? <ActivitiesHeader /> : null}
              <ActivitiesList />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
