"use client";
import s from "./Modals.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { sendIncome } from "@/services/unipass";
import { UseUser } from "@/context/UserContext";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { trackOwnerType } from "@/types/types";

export function TrackOwnerModal(props: { trackOwnerData: trackOwnerType }) {
  const t = useTranslations("Header");
  const userContext = UseUser();
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState(false);

  async function handleSendIncome() {
    if (!amount.trim().length) {
      setAmountError(true);
      return;
    }
    const amountPattern = /^\s*\d+(\.\d+)?\s*$/g;
    const found = amount.match(amountPattern);
    if (found === null) {
      setAmountError(true);
      return;
    }

    let res = sendIncome(
      userContext.currentUser,
      props.trackOwnerData.tokenAddress,
      found[0].trim(),
    );
    res
      .then(() => {
        console.log("success");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className={s.wrapper}>
      <div className={s.adminMenu}>
        <p style={{ lineHeight: "110%", color: "white", fontWeight: 600 }}>
          {props.trackOwnerData.track}
        </p>
        <input
          className={s.inputIncome}
          type={"text"}
          title={""}
          placeholder={t("amount")}
          autoComplete={"off"}
          autoCorrect={"off"}
          spellCheck={"false"}
          onChange={(e) => {
            if (amountError) {
              setAmountError(false);
            }
            setAmount(e.target.value);
          }}
        />
        {amountError ? (
          <p style={{ color: "#ff4d4d", lineHeight: "100%" }}>
            Invalid amount.
          </p>
        ) : null}
        <Button
          color={"main"}
          title={t("send_income")}
          arrow={false}
          action={async () => {
            await handleSendIncome();
          }}
        />
      </div>
    </div>
  );
}
