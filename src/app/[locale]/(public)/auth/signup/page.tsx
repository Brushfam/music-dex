"use client";

import s from "../Auth.module.scss";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { isVerified } from "@/services/auth/auth";
import { EmailSent } from "@/app/[locale]/(public)/auth/EmailSent";
import { EmailIsNotVerified } from "@/app/[locale]/(public)/auth/signup/EmailIsNotVerified";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { addNewUser } from "@/services/users/users";
import { useLocale } from "use-intl";
import { Button } from "@/components/ui/Button/Button";
import { PasswordInput } from "@/app/[locale]/(public)/auth/_components/PasswordInput";
import { EmailInput } from "@/app/[locale]/(public)/auth/_components/EmailInput";
import { SignUpSteps, UserRoles } from "@/types/types";
import { ChooseAccount } from "@/app/[locale]/(public)/auth/signup/ChooseAccount";

function SignUp(props: {
  setStep: React.Dispatch<React.SetStateAction<SignUpSteps>>;
  role: UserRoles;
}) {
  const t = useTranslations("Auth");
  const currentLocale = useLocale();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [isHidden, setHidden] = useState(true);
  const [isSecondHidden, setSecondHidden] = useState(true);

  const actionCodeSettings = {
    url: "https://musicdex.co/" + currentLocale + "/auth/login",
    handleCodeInApp: true,
  };

  function isPasswordsMatch() {
    return password.trim() === secondPassword.trim();
  }

  const handleSignUp = async () => {
    if (!isPasswordsMatch()) {
      toast.error(t("passwords_dont_match"));
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(firebaseAuth, email.trim(), password.trim())
      .then(async (user) => {
        const idToken = await user.user.getIdToken();
        await addNewUser(idToken, email.trim(), props.role);
        sendEmailVerification(user.user, actionCodeSettings)
          .then(() => {
            props.setStep(SignUpSteps.EmailSent);
          })
          .catch((e) => {
            console.log(e);
            toast.error(t("other_errors"));
          });
      })
      .catch((error) => {
        console.log(error);
        handleSignUpErrors(error.code);
      });
  };

  function handleSignUpErrors(errorCode: string) {
    switch (errorCode) {
      case "auth/email-already-in-use":
        checkVerification();
        break;
      case "auth/invalid-email":
        console.log(`Email address is invalid.`);
        toast.error(t("invalid_email"));
        break;
      case "auth/operation-not-allowed":
        console.log(`Operation not allowed.`);
        toast.error(t("other_errors"));
        break;
      case "auth/weak-password":
        console.log("Password is not strong enough.");
        toast.error(t("weak_password"));
        break;
      case "auth/missing-password":
        console.log("Password is not strong enough.");
        toast.error(t("weak_password"));
        break;
      default:
        console.log("Error during sign up.");
        toast.error(t("other_errors"));
        break;
    }
    setLoading(false);
  }

  function checkVerification() {
    localStorage.setItem("signup-reset-email", email.trim());
    isVerified(email.trim())
      .then((response) => {
        if (response.data.isVerified) {
          console.log(`Email address already in use.`);
          toast.error(t("existing_email_error"));
        } else {
          props.setStep(SignUpSteps.EmailIsNotVerified);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error(t("other_errors"));
      });
  }

  return (
    <div className={s.block}>
      <p className={s.title} style={{ marginBottom: 14 }}>
        {props.role === UserRoles.Investor
          ? t("signup_investor_title")
          : t("signup_artist_title")}
      </p>
      <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
        <EmailInput setEmail={setEmail} email={email} />
        <PasswordInput
          setPassword={setPassword}
          password={password}
          placeholder={t("password")}
          setHidden={setHidden}
          isHidden={isHidden}
        />
        <PasswordInput
          setPassword={setSecondPassword}
          password={secondPassword}
          placeholder={t("confirm_password")}
          setHidden={setSecondHidden}
          isHidden={isSecondHidden}
        />
        <div style={{marginBottom: 14}}/>
        <Button
          title={t("sign_up")}
          color={loading ? "loading" : "main"}
          arrow={false}
          type={loading ? "button" : "submit"}
          action={loading ? () => {} : handleSignUp}
          fullLength={true}
        />
      </div>
      <p className={s.secondaryText}>{t("agreement_text")}</p>
    </div>
  );
}

export default function SignUpPage() {
  const t = useTranslations("Auth");
  const [step, setStep] = useState<SignUpSteps>(SignUpSteps.ChooseAccount);
  const [role, setRole] = useState<UserRoles>(UserRoles.Investor);

  function CurrentStep() {
    switch (step) {
      case SignUpSteps.ChooseAccount:
        return <ChooseAccount setStep={setStep} setRole={setRole} />;
      case SignUpSteps.SignUp:
        return <SignUp setStep={setStep} role={role} />;
      case SignUpSteps.EmailSent:
        return (
          <EmailSent comment={t("email_sent_signup")} route={"/auth/login"} />
        );
      case SignUpSteps.EmailIsNotVerified:
        return <EmailIsNotVerified />;
      default:
        return <SignUp setStep={setStep} role={role} />;
    }
  }

  return <CurrentStep />;
}
