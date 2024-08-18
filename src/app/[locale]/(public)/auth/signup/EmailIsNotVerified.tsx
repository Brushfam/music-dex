"use client";

import s from "@/app/[locale]/(public)/auth/Auth.module.scss";
import { useTranslations } from "next-intl";
import { useLocale } from "use-intl";

export function EmailIsNotVerified() {
  const t = useTranslations("Auth");
  const currentLocation = useLocale();

  return (
    <div className={s.emailIsNotVerified}>
      <p className={s.title} style={{ marginBottom: 16 }}>
        {t("verify_the_email")}
      </p>
      <p className={s.secondaryText} style={{ marginBottom: 10 }}>
        {t("verify_message1")}
      </p>
      <a
        href={"/" + currentLocation + "/auth/login"}
        style={{ cursor: "pointer", textDecoration: "underline" }}
      >
        {t("already_verified")}
      </a>
    </div>
  );
}
