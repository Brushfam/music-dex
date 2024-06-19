"use client";

import s from "../Auth.module.scss";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { authWithGoogle, isVerified } from "@/services/auth/auth";
import { EmailSent } from "@/app/[locale]/auth/EmailSent";
import { EmailIsNotVerified } from "@/app/[locale]/auth/signup/EmailIsNotVerified";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { addNewUser } from "@/services/users/users";
import { useLocale } from "use-intl";
import { Button } from "@/components/ui/Button/Button";
import { PasswordInput } from "@/app/[locale]/auth/_components/PasswordInput";
import { EmailInput } from "@/app/[locale]/auth/_components/EmailInput";
import { SignUpSteps } from "@/types/types";

enum UserRoles {
  Investor = "investor",
  Artist = "artist",
}

function SignUp(props: {
  setStep: React.Dispatch<React.SetStateAction<SignUpSteps>>;
}) {
  const t = useTranslations("Auth");
  const currentLocale = useLocale();

  const [role, setRole] = useState<UserRoles>(UserRoles.Investor);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHidden, setHidden] = useState(true);

  const actionCodeSettings = {
    url: "https://musicdex.co/auth/" + currentLocale + "/login",
    handleCodeInApp: true,
  };

  const handleSignUp = async () => {
    createUserWithEmailAndPassword(firebaseAuth, email.trim(), password)
      .then(async (user) => {
        const idToken = await user.user.getIdToken();
        addNewUser(idToken, email.trim(), role);
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
  }

  function checkVerification() {
    localStorage.setItem("signup-reset-email", email.trim());
    isVerified(email.trim())
      .then((response) => {
        if (response.data.isVerified) {
          console.log(`Email address already in use.`);
          toast.error(t("existing_email_error"));
        } else {
          // add send new email feature
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
        {role === UserRoles.Investor
          ? t("signup_title")
          : t("signup_artist_title")}
      </p>
      {role === UserRoles.Investor ? (
        <p
          className={s.secondaryText}
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            marginBottom: 24,
          }}
          onClick={() => {
            setRole(UserRoles.Artist);
          }}
        >
          {t("link_to_artist_signup")}
        </p>
      ) : null}
      <div style={{ marginBottom: 24, width: "100%" }}>
        <EmailInput setEmail={setEmail} email={email} />
        <PasswordInput
          setPassword={setPassword}
          password={password}
          placeholder={t("password")}
          setHidden={setHidden}
          isHidden={isHidden}
        />
        <Button
          title={t("sign_up")}
          color={"main"}
          arrow={false}
          type={"submit"}
          action={handleSignUp}
          fullLength={true}
        />
      </div>
      <p className={s.secondaryText}>{t("agreement_text")}</p>
    </div>
  );
}

export default function SignUpPage() {
  const t = useTranslations("Auth");
  const [step, setStep] = useState<SignUpSteps>(SignUpSteps.SignUp);

  function CurrentStep() {
    switch (step) {
      case SignUpSteps.SignUp:
        return <SignUp setStep={setStep} />;
      case SignUpSteps.EmailSent:
        return <EmailSent comment={t("email_sent_signup")} />;
      case SignUpSteps.EmailIsNotVerified:
        return <EmailIsNotVerified setStep={setStep} />;
      default:
        return <SignUp setStep={setStep} />;
    }
  }

  return <CurrentStep />;
}
