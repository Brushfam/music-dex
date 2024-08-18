"use client";

import s from "@/app/[locale]/(public)/auth/Auth.module.scss";
import { EmailSent } from "@/app/[locale]/(public)/auth/EmailSent";
import { EmailInput } from "@/app/[locale]/(public)/auth/_components/EmailInput";
import { PasswordInput } from "@/app/[locale]/(public)/auth/_components/PasswordInput";
import { ResetPassword } from "@/app/[locale]/(public)/auth/login/ResetPassword";
import { ProfileForm } from "@/app/[locale]/(public)/auth/login/_forms/ProfileForm";
import { Button } from "@/components/ui/Button/Button";
import { isVerified } from "@/services/auth/auth";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { getUserLoginInfo } from "@/services/users/users";
import { useUserStore } from "@/store/user";
import { LoginSteps } from "@/types/types";
import {
  UserCredential,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocale } from "use-intl";

function Login(props: {
  setStep: React.Dispatch<React.SetStateAction<LoginSteps>>;
  currentLocale: string;
}) {
  const t = useTranslations("Auth");
  const currentLocale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const setCurrentUserEmail = useUserStore(
    (state) => state.setCurrentUserEmail
  );
  const setCurrentUserName = useUserStore((state) => state.setCurrentUserName);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHidden, setHidden] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const expiredSession = searchParams.get("expired-session");
    if (expiredSession) {
      toast.info(t("expired_session"));
    }
  }, [searchParams, t]);

  const actionCodeSettings = {
    url: "https://musicdex.co/" + currentLocale + "/auth/login",
    handleCodeInApp: true,
  };

  async function handleLogin() {
    setLoading(true);
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (userCredential: UserCredential) => {
        verifyUser(userCredential);
      })
      .catch((error) => {
        console.log(error);
        toast.error(t("wrong_password"));
        setLoading(false);
      });
  }

  function getUserInfoAndRedirect(idToken: string) {
    getUserLoginInfo(idToken)
      .then((res) => {
        setCurrentUserName(res.data.firstName);
        if (res.data.isFirstLogin) {
          props.setStep(LoginSteps.ProfileForm);
        } else {
          router.replace("/" + props.currentLocale + "/profile");
        }
      })
      .catch((error) => {
        console.log(error);
        router.replace("/" + props.currentLocale + "/profile");
      });
  }

  function verifyUser(userCredential: UserCredential) {
    isVerified(email.trim())
      .then(async (response) => {
        if (!response.data.isVerified) {
          sendEmailVerification(userCredential.user, actionCodeSettings)
            .then(() => {
              toast.error(t("email_is_not_verified"));
            })
            .catch((e) => {
              console.log(e);
              toast.error(t("other_errors"));
            });
        } else {
          setCurrentUserEmail(userCredential.user.email || "");
          const user = userCredential.user;
          const idToken = await user.getIdToken();
          getUserInfoAndRedirect(idToken);
        }
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
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
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
          color={loading ? "loading" : "main"}
          arrow={false}
          type={loading ? "button" : "submit"}
          action={
            loading
              ? () => {}
              : async () => {
                  await handleLogin();
                }
          }
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
        return <EmailSent comment={t("email_sent_reset")} route={"/"} />;
      case LoginSteps.ProfileForm:
        return <ProfileForm />;
      default:
        return <Login setStep={setStep} currentLocale={currentLocale} />;
    }
  }

  return <CurrentStep />;
}
