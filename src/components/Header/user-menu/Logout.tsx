"use client";

import cs from "@/app/commonStyles.module.scss";
import s from "@/components/Header/Header.module.scss";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useDisconnect } from "@starknet-react/core";
import { useUserStore } from "@/store/user";

export function LogoutButton() {
  const logout = useUserStore((state) => state.logout);
  const { disconnect } = useDisconnect();
  const t = useTranslations("Header");

  function handleOnClick() {
    disconnect();
    logout();
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
