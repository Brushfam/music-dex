"use client";

import cs from "@/app/commonStyles.module.scss";
import s from "@/components/Header/Header.module.scss";
import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function LoginButton(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const t = useTranslations("Header");

  return (
    <button
      type={"button"}
      className={cs.headerButton}
      onClick={() => {
        props.setOpen(!props.open);
      }}
    >
      {props.open ? (
        <div className={s.mediaWrapper}>
          <p>{t("close")}</p>
          <Image
            src={"/icons/header/arrow.svg"}
            alt={"arrow"}
            width={18}
            height={10}
          />
        </div>
      ) : (
        <div className={s.mediaWrapper}>
          <p>{t("login")}</p>
          <Image
            src={"/icons/wallet.svg"}
            alt={"log in"}
            width={20}
            height={20}
          />
        </div>
      )}
    </button>
  );
}
