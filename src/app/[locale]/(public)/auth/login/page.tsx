"use client";

import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import s from "@/app/[locale]/(public)/auth/Auth.module.scss";
import { EmailSent } from "@/app/[locale]/(public)/auth/EmailSent";
import { EmailInput } from "@/app/[locale]/(public)/auth/_components/EmailInput";
import { PasswordInput } from "@/app/[locale]/(public)/auth/_components/PasswordInput";
import { Button } from "@/components/ui/Button/Button";
import { ResetPassword } from "@/app/[locale]/(public)/auth/login/ResetPassword";
import Link from "next/link";
import { useLocale } from "use-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { isVerified } from "@/services/auth/auth";
import { LoginSteps } from "@/types/types";
import { useUserStore } from "@/store/user";

function Login(props: {
  setStep: React.Dispatch<React.SetStateAction<LoginSteps>>;
  currentLocale: string;
}) {
  const t = useTranslations("Auth");
  const router = useRouter();
  const searchParams = useSearchParams();
  const setCurrentUserEmail = useUserStore(
    (state) => state.setCurrentUserEmail,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHidden, setHidden] = useState(true);

  useEffect(() => {
    const expiredSession = searchParams.get("expired-session");
    if (expiredSession) {
      toast.info("Ypu session have expired. Please re-login");
    }
  }, [searchParams]);

  const handleLogin = async () => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (userCredential: UserCredential) => {
        verifyUser(userCredential);
      })
      .catch((error) => {
        console.log(error);
        toast.error(t("wrong_password"));
      });
  };

  function verifyUser(userCredential: UserCredential) {
    isVerified(email.trim())
      .then(async (response) => {
        if (!response.data.isVerified) {
          console.log(`Email address is not verified.`);
          toast.error(t("email_is_not_verified"));
          return;
        }
        const user = userCredential.user;
        const idToken = await user.getIdToken();
        localStorage.setItem("fb-jwt-token", idToken);
        setCurrentUserEmail(user.email || "");
        router.replace("/" + props.currentLocale + "/profile");
      })
      .catch((e) => {
        console.log(e);
        toast.error(t("other_errors"));
      });
  }

  return (
    <div className={s.block}>
      <p className={s.title} style={{ marginBottom: 24 }}>
        {t("login_title")}
      </p>
      <div style={{ width: "100%" }}>
        <EmailInput setEmail={setEmail} email={email} />
        <PasswordInput
          setPassword={setPassword}
          password={password}
          placeholder={t("password")}
          setHidden={setHidden}
          isHidden={isHidden}
        />
        <Button
          title={t("sign_in")}
          color={"main"}
          arrow={false}
          type={"submit"}
          action={handleLogin}
          fullLength={true}
        />
        <p
          className={s.secondaryText}
          style={{
            textDecoration: "underline",
            margin: "24px 0 14px 0",
            cursor: "pointer",
          }}
          onClick={() => {
            props.setStep(LoginSteps.ResetPassword);
          }}
        >
          {t("forgot_password")}
        </p>
        <div className={s.dontHaveAccount}>
          <p>{t("link_to_signup")}</p>
          <Link href={"/" + props.currentLocale + "/auth/signup"}>
            {t("sign_up")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const t = useTranslations("Auth");
  const currentLocale = useLocale();
  const [step, setStep] = useState<LoginSteps>(LoginSteps.Login);

  function CurrentStep() {
    switch (step) {
      case LoginSteps.Login:
        return <Login setStep={setStep} currentLocale={currentLocale} />;
      case LoginSteps.ResetPassword:
        return (
          <ResetPassword setStep={setStep} currentLocale={currentLocale} />
        );
      case LoginSteps.EmailSent:
        return <EmailSent comment={t("email_sent_reset")} />;
      default:
        return <Login setStep={setStep} currentLocale={currentLocale} />;
    }
  }

  return <CurrentStep />;
}
