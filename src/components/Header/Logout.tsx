"use client";

import cs from "@/app/commonStyles.module.scss";
import s from "@/components/Header/Header.module.scss";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { useUserStore } from "@/store/user";
import { signOut } from "@firebase/auth";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { toast } from "sonner";

export function LogoutButton() {
  const t = useTranslations("Header");
  const setCurrentUserEmail = useUserStore(
    (state) => state.setCurrentUserEmail
  );

  function handleOnClick() {
    signOut(firebaseAuth)
      .then(() => {
        setCurrentUserEmail("");
      })
      .catch((error) => {
        console.log(error);
        toast.error(t("error_logout"));
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
