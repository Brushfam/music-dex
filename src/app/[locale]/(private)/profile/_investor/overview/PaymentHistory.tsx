"use client";

import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { getUserRoyalties } from "@/services/users/users";
import { IRoyaltyData } from "@/types/types";
import dayjs from "dayjs";
import _ from "lodash";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import s from "./Overview.module.scss";

function EmptyRoyalties() {
  const t = useTranslations("ProfileInvestor.Royalties");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        fontSize: "14px",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Image
        src={"/profile/empty-list/payment-history.svg"}
        alt={"icon"}
        width={38}
        height={48}
        style={{ marginBottom: 4 }}
      />
      <p className={s.text1}>{t("empty_history_title")}</p>
      <p className={s.text2}>{t("empty_history_desc")}</p>
    </div>
  );
}

export function PaymentHistory() {
  const t = useTranslations("ProfileInvestor.Overview");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [royalties, setRoyalties] = useState<IRoyaltyData[]>([]);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          setLoading(true);

          const token = await user.getIdToken();

          const res = await getUserRoyalties(token);

          setRoyalties(res.data);
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
    <div className={s.secondBlock}>
      <p className={s.title}>{t("payment_history")}</p>
      {royalties.length > 0 ? (
        <div className={s.wrapper}>
          <div className={s.inputOutputHeader}>
            <p>{t("payment_history_table.date")}</p>
            <p>{t("payment_history_table.song")}</p>
            <p>{t("payment_history_table.usdt")}</p>
            <p className={s.inputOutputHeader_amount}>
              {t("payment_history_table.amount")}
            </p>
          </div>

          {royalties.map((royalty) => (
            <div className={s.inputOutputRow} key={royalty.royalties_id}>
              <div>{dayjs(royalty.created_at).format("DD/MM/YYYY HH:mm")}</div>
              <div>
                <div>{royalty.song.title}</div>
                <div
                  style={{
                    color: "#C4C4C4",
                  }}
                >
                  {royalty.song.artist}
                </div>
              </div>
              <div>${royalty.usdt_amount}</div>
              <div className={s.inputOutputRow_amount}>
                {_.round(Number(royalty.amount), 8)} {royalty.currency.symbol}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyRoyalties />
      )}
    </div>
  );
}
