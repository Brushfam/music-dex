"use client";
import s from "./Modals.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { getTestTokens, sendIncome } from "@/services/unipass";
import { UseUser } from "@/context/UserContext";
import { useState } from "react";

export function AdminModal() {
  const userContext = UseUser();
  const [incomeStatus, setIncomeStatus] = useState("");
  const [getTokensStatus, setGetTokensStatus] = useState("");

  function Message(props: { status: string; functionName: string }) {
    if (props.status === "success") {
      return (
        <p className={s.successMessage}>
          {props.functionName} transaction was{" "}
          <span style={{ color: "#88cc00", fontWeight: 700 }}>successful</span>
        </p>
      );
    } else if (props.status === "error") {
      return (
        <p className={s.errorMessage}>
          {props.functionName} transaction was{" "}
          <span style={{ color: "#ff4d4d", fontWeight: 700}}>failed</span>
        </p>
      );
    } else {
      return <></>;
    }
  }

  return (
    <div className={s.wrapper}>
      <div className={s.adminMenu}>
        <Button
          color={"main"}
          title={"Send income"}
          arrow={true}
          action={async () => {
            setIncomeStatus("");
            let res = await sendIncome(userContext.currentUser);
            res ? setIncomeStatus("success") : setIncomeStatus("error");
          }}
        />
        <Message status={incomeStatus} functionName={"Send income"} />
        <Button
          color={"grey"}
          title={"Get test tokens"}
          arrow={true}
          action={async () => {
            setGetTokensStatus("");
            let res = await getTestTokens(userContext.currentUser);
            res ? setGetTokensStatus("success") : setGetTokensStatus("error");
          }}
        />
        <Message status={getTokensStatus} functionName={"Send test tokens"} />
      </div>
    </div>
  );
}
