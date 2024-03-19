"use client";
import s from "@/components/Header/modals/Modals.module.scss";
import { useTranslations } from "next-intl";

export function UserTokensModal(props: {
  userBalances: number[];
  userEarning: number[];
}) {
  const t = useTranslations("Header");
  // Hardcoded data
  const tokenNamesArray = ["Ukrainian Sun", "My Kyiv", "OG 044"];

  return (
    <div className={s.wrapper}>
      <div className={s.tokensBlock}>
        {props.userBalances.length ? (
          props.userBalances.map((value, index) => {
            return value ? (
              <div className={s.tokenItem} key={index.toString()}>
                <div className={s.tokenItem_row}>
                  <p>{tokenNamesArray[index]}</p>
                  <p>{value}</p>
                </div>
                <div className={s.tokenItem_row}>
                  <p>{t("earned")}</p>
                  <p>${props.userEarning[index]}</p>
                </div>
                <button type={"button"} className={s.tmpButton}>
                  {t("claim")}
                </button>
              </div>
            ) : null;
          })
        ) : (
          <div style={{ padding: "8px 12px" }}>
            <p style={{ textAlign: "center" }}>{t("no_tokes")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
