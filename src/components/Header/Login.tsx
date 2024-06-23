"use client";

import cs from "@/app/commonStyles.module.scss";
import { useTranslations } from "next-intl";
import { useLocale } from "use-intl";
import Link from "next/link";

export function Login() {
  const t = useTranslations("Header");
  const currentLocale = useLocale();

  return (
    <div style={{ position: "relative" }}>
      <Link
        type={"button"}
        className={cs.headerButton}
        href={"/" + currentLocale + "/auth/login"}
      >
        <p>{t("login")}</p>
      </Link>
    </div>
  );
}
