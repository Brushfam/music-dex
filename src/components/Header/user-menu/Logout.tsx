"use client";

import cs from "@/app/commonStyles.module.scss";
import s from "@/components/Header/Header.module.scss";
import { unipassLogout } from "@/services/unipass";
import { UseUser } from "@/context/UserContext";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function LogoutButton() {
  let userContext = UseUser();
  const t = useTranslations("Header");

  function handleOnClick() {
    let res = unipassLogout();
    res
      .then(() => {
        userContext.logout();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div
      className={cs.headerButton}
      onClick={() => {
        handleOnClick();
      }}
    >
      <div className={s.mediaWrapper}>
        <p>{t("logout")}</p>
        <Image
          src={"/icons/header/log-out.svg"}
          alt={"logout"}
          width={18}
          height={19}
        />
      </div>
    </div>
  );
}
