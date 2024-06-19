"use client";

import { useTranslations } from "next-intl";
import s from "@/app/[locale]/auth/Auth.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { toast } from "sonner";
import React from "react";
import {SignUpSteps} from "@/types/types";

export function EmailIsNotVerified(props: {
  setStep: React.Dispatch<React.SetStateAction<SignUpSteps>>;
}) {
  const t = useTranslations("Auth");

  const handleReset = () => {
    const email = localStorage.getItem("signup-reset-email");
    if (!email) {
        console.log("Localstorage email is empty.")
        toast.error(t("other_errors"));
        return;
    }
    sendPasswordResetEmail(firebaseAuth, email)
      .then(() => {
        props.setStep(SignUpSteps.EmailSent);
      })
      .catch((error) => {
        console.log(error);
        toast.error(t("other_errors"));
      });
  };

  return (
    <div className={s.block}>
      <p className={s.title} style={{ marginBottom: 24 }}>
        {t("verify_the_email")}
      </p>
      <p className={s.secondaryText} style={{ marginBottom: 10 }}>
        {t("verify_message1")}
      </p>
      <p className={s.secondaryText} style={{ marginBottom: 24 }}>
        {t("verify_message2")}
      </p>
      <Button
        title={t("send_the_email")}
        color={"main"}
        arrow={false}
        action={handleReset}
        fullLength={true}
      />
    </div>
  );
}
