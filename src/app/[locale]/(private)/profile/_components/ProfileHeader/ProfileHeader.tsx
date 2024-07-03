"use client";

import s from "./ProfileHeader.module.scss";
import { useState } from "react";
import { useLocale } from "use-intl";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function ProfileHeader() {
  const t = useTranslations("Header");
  const [modalOpen, setModalOpen] = useState(false);
  const currentLocale = useLocale();

  function ModalMenu() {
    return modalOpen ? (
      <div className={s.modal}>
        <a href={"/" + currentLocale} className={s.modalButton}>
          MusicDex
        </a>
        <div className={s.line}></div>
        <div className={s.modalButton}>
          {currentLocale === "en" ? "Log out" : "Вихід"}
        </div>
      </div>
    ) : null;
  }

  return (
    <div className={s.profileHeader}>
      <div
        style={{
          borderRadius: 50,
          overflow: "hidden",
          position: "relative",
          width: 40,
          height: 40,
        }}
      >
        <Image src={"/kalush.jpeg"} alt={"avatar"} fill={true} />
      </div>
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
          <p className={s.name}>Oleg</p>
          <p className={s.email}>kalush@music.com</p>
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
