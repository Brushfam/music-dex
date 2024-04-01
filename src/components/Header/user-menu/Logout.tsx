"use client";

import cs from "@/app/commonStyles.module.scss";
import s from "@/components/Header/Header.module.scss";
import { unipassLogout } from "@/services/unipass";
import { UseUser } from "@/context/UserContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useDisconnect } from "@web3modal/ethers5/react";

export function LogoutButton() {
  let userContext = UseUser();
  const { disconnect } = useDisconnect();
  const t = useTranslations("Header");

  function handleOnClick() {
    const isUnipass = userContext.wallet === "Unipass"

    if (!isUnipass && disconnect === undefined) {
      userContext.logout();
      return;
    }

    let logoutPromise = isUnipass ? unipassLogout() : disconnect();
    logoutPromise
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
