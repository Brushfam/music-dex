import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import s from "@/app/[locale]/(public)/auth/Auth.module.scss";
import { Button } from "@/components/ui/Button/Button";
import React, { useState } from "react";
import { EmailInput } from "@/app/[locale]/(public)/auth/_components/EmailInput";
import {LoginSteps} from "@/types/types";

export function ResetPassword(props: {
  setStep: React.Dispatch<React.SetStateAction<LoginSteps>>;
  currentLocale: string;
}) {
  const t = useTranslations("Auth");
  const [email, setEmail] = useState("");

  const actionCodeSettings = {
    url: "https://musicdex.co/" + props.currentLocale + "/auth/login",
    handleCodeInApp: true,
  };

  const handleReset = () => {
    sendPasswordResetEmail(firebaseAuth, email, actionCodeSettings)
      .then(() => {
        props.setStep(LoginSteps.EmailSent);
      })
      .catch((error) => {
        console.log(error);
        toast.error(t("invalid_email"));
      });
  };

  return (
    <div className={s.block}>
      <p className={s.title} style={{ marginBottom: 24 }}>
        {t("reset_password")}
      </p>
      <p
        className={s.secondaryText}
        style={{ marginBottom: 18, maxWidth: 300 }}
      >
        {t("enter_email")}
      </p>
      <div style={{ marginBottom: 14, width: "100%" }}>
        <EmailInput setEmail={setEmail} email={email} />
      </div>
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
