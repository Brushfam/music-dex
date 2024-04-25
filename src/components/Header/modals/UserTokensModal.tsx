"use client";
import s from "@/components/Header/modals/Modals.module.scss";
import { useTranslations } from "next-intl";
import { Spinner } from "@/components/Spinner/Spinner";

export function UserTokensModal(props: {
  loading: boolean;
  userBalances: string[];
  userEarning: string[];
}) {
  const t = useTranslations("Header");
  const tokenNamesArray = ["Дилер"];

  function TokensList() {
    return (
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
                {/*<button type={"button"} className={s.tmpButton}>*/}
                {/*  {t("claim")}*/}
                {/*</button>*/}
              </div>
            ) : null;
          })
        ) : (
          <div style={{ padding: "8px 12px" }}>
            <p style={{ textAlign: "center" }}>{t("no_tokes")}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={s.wrapper}>
      {props.loading ? (
        <div className={s.tokensBlock} style={{height: 100, alignItems: "center", justifyContent: "center"}}>
          <Spinner size={30}/>
        </div>
      ) : (
        <TokensList />
      )}
    </div>
  );
}
