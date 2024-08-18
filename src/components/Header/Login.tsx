"use client";

import cs from "@/app/commonStyles.module.scss";
import s from "@/components/Header/Header.module.scss";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "use-intl";

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
        <div className={s.mediaWrapper}>
          <p>{t("login")}</p>
          <Image
            src={"/icons/header/log-in.svg"}
            alt={"logout"}
            width={17}
            height={18}
          />
        </div>
      </Link>
    </div>
  );
}
