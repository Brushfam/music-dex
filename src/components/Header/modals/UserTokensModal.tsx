"use client";
import s from "@/components/Header/modals/Modals.module.scss";

export function UserTokensModal(props: {
  userBalances: number[];
  userEarning: number[];
}) {
  // Hardcoded data
  const tokenNamesArray = ["Ukrainian Sun", "My Kyiv", "OG 044"];

  return (
    <div className={s.wrapper}>
      <div className={s.block}>
        {props.userBalances.length ? (
          props.userBalances.map((value, index) => {
            return value ? (
              <div className={s.tokenItem} key={index.toString()}>
                <div className={s.tokenItem_row}>
                  <p>{tokenNamesArray[index]}</p>
                  <p>{value}</p>
                </div>
                <div className={s.tokenItem_row}>
                  <p>Earned</p>
                  <p>${props.userEarning[index]}</p>
                </div>
              </div>
            ) : null;
          })
        ) : (
          <div style={{ padding: "8px 12px" }}>
            <p style={{ textAlign: "center" }}>You do not have any token.</p>
          </div>
        )}
      </div>
    </div>
  );
}
