"use client";

import cs from "@/app/commonStyles.module.scss";
import s from "@/components/Header/Header.module.scss";
import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { UseUser } from "@/context/UserContext";
import { unipassLogin } from "@/services/unipass";
import { getTrackOwnerData } from "@/services/helpers";
import { hasAgreement } from "@/services/unipass-server";

export function LoginButton() {
  const t = useTranslations("Header");

  let userContext = UseUser();

  function emailOnClick() {
    let res = unipassLogin();
    res
      .then((address) => {
        if (address) {
          loginSetup(address);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function loginSetup(address: string) {
    userContext.login(address, getTrackOwnerData(address));
    let agreementPromise = hasAgreement(address);
    agreementPromise
      .then((value) => {
        userContext.setHasAgreement(value);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <button
      type={"button"}
      className={cs.headerButton}
      onClick={() => {
        emailOnClick();
      }}
    >
      <div className={s.mediaWrapper}>
        <p>{t("login")}</p>
        <Image
          src={"/icons/header/log-in.svg"}
          alt={"log in"}
          width={16}
          height={18}
        />
      </div>
    </button>
  );
}
