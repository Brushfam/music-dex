"use client";

import s from "./Modals.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { unipassSendIncome } from "@/services/blockchain/ethersMethods";
import { UseUser } from "@/context/UserContext";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { trackOwnerType } from "@/types/types";
import { toast } from "sonner";

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

    toast.promise(
        unipassSendIncome(
        userContext.currentUser,
        props.trackOwnerData.tokenAddress,
        found[0].trim(),
      ),
      {
        loading: t("toaster.income_info"),
        success: () => {
          return t("toaster.income_success");
        },
        error: t("toaster.income_error"),
      },
    );
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
            {t("invalid_amount")}
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
