"use client";

import s from "./ProfileHeader.module.scss";
import { useUserStore } from "@/store/user";
import { useEffect, useState } from "react";
import { useLocale } from "use-intl";
import Image from "next/image";
import { signOut } from "@firebase/auth";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function ProfileHeader() {
  const t = useTranslations("Header");
  const userName = useUserStore((state) => state.currentUserName);
  const userEmail = useUserStore((state) => state.currentUserEmail);
  const setCurrentUserEmail = useUserStore(
    (state) => state.setCurrentUserEmail,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const currentLocale = useLocale();
  const router = useRouter();

  useEffect(() => {}, [userName]);

  function handleLogout() {
    signOut(firebaseAuth)
      .then(() => {
        router.replace("/");
        // setCurrentUserEmail("");
      })
      .catch((error) => {
        console.log(error);
        toast.error(t("error_logout"));
      });
  }

  function ModalMenu() {
    return modalOpen ? (
      <div className={s.modal}>
        <a href={"/" + currentLocale} className={s.modalButton}>
          MusicDex
        </a>
        <div className={s.line}></div>
        <div
          className={s.modalButton}
          onClick={() => {
            handleLogout();
          }}
        >
          {currentLocale === "en" ? "Log out" : "Вихід"}
        </div>
      </div>
    ) : null;
  }

  return (
    <div className={s.profileHeader}>
      <Image
        src={"/profile/avatar.svg"}
        alt={"avatar"}
        width={40}
        height={40}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => {
          setModalOpen(!modalOpen);
        }}
      >
        <div className={s.content}>
          <p className={s.name}>{userName ? userName : "User"}</p>
          <p className={s.email}>{userEmail}</p>
        </div>
        <Image
          src={"/profile/icons/header-arrow.svg"}
          alt={"arrow"}
          width={11}
          height={6}
          style={modalOpen ? { transform: "rotate(180deg)" } : {}}
        />
      </div>
      <ModalMenu />
    </div>
  );
}
