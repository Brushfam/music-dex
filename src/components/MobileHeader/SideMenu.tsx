"use client";

import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { useUserStore } from "@/store/user";
import { signOut } from "@firebase/auth";
import Drawer from "@mui/material/Drawer";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";
import { useLocale } from "use-intl";
import s from "./MobileHeader.module.scss";

function HeaderSocialLinks() {
  return (
    <div className={s.header_social_links}>
      <a href="https://www.instagram.com/musicdex.inc/" target="_blank">
        <Image
          src="/icons/social-media/inst-mobile.svg"
          alt="instagram logo"
          width={24}
          height={24}
        />
      </a>
      <a
        href="https://youtube.com/@musicdex.?si=FXjAQGaWki_HZHQ7"
        target="_blank"
      >
        <Image
          src="/icons/social-media/youtube-mobile.svg"
          alt="youtube logo"
          width={24}
          height={24}
        />
      </a>
      <a href="https://x.com/MusicDex_inc" target="_blank">
        <Image
          src="/icons/social-media/twitter-mobile.svg"
          alt="youtube logo"
          width={24}
          height={24}
        />
      </a>
      <a href="https://www.tiktok.com/@music.dex?lang=ru-RU" target="_blank">
        <Image
          src="/icons/social-media/tt-mobile.svg"
          alt="TikTok logo"
          width={24}
          height={24}
        />
      </a>
      <a href="https://t.me/musicdexplatform" target="_blank">
        <Image
          src="/icons/social-media/telegram-mobile.svg"
          alt="Telegram logo"
          width={24}
          height={24}
        />
      </a>
    </div>
  );
}

export default function SideMenu(props: { currentUser: string }) {
  const currentLocale = useLocale();
  const [open, setOpen] = React.useState(false);
  const t = useTranslations("Header");

  function PageRow(rowProps: { title: string; link: string }) {
    return (
      <Link href={rowProps.link} className={s.pagesRow}>
        <div className={s.hoverBlock}></div>
        <p>{rowProps.title}</p>
      </Link>
    );
  }

  function PagesList() {
    return (
      <div className={s.pagesList}>
        <PageRow
          title={t("catalog")}
          link={"/" + currentLocale + "/songs"}
        ></PageRow>
        <PageRow
          title={t("for_artist")}
          link={"/" + currentLocale + "/for-artist"}
        ></PageRow>
        <PageRow
          title={t("blog")}
          link={"/" + currentLocale + "/blog"}
        ></PageRow>
        <PageRow
          title={t("gallery")}
          link={"/" + currentLocale + "/gallery"}
        ></PageRow>
        <PageRow title={t("faq")} link={"/" + currentLocale + "/faq"}></PageRow>
      </div>
    );
  }

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  function LogoutButton() {
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
        onClick={() => {
          handleOnClick();
        }}
        className={s.logout}
      >
        <Image
          src={"/icons/header/log-out.svg"}
          alt={"logout"}
          width={18}
          height={19}
        />
        <p>{t("logout")}</p>
      </div>
    );
  }

  const DrawerList = (
    <div className={s.sidebar} onClick={toggleDrawer(false)}>
      <Image
        src={"/icons/close.svg"}
        alt={"close"}
        width={14}
        height={14}
        className={s.sidebar_close}
        onClick={toggleDrawer(false)}
      />
      <Link href={"/"} className={s.sidebar_logo}>
        <Image alt={"logo"} src={"/logos/MusicDex-logo.svg"} fill={true} />
      </Link>
      <PagesList />
      <HeaderSocialLinks />
      {props.currentUser ? <LogoutButton /> : null}
    </div>
  );

  return (
    <div className={s.sidebarWrapper}>
      <Image
        src={"/profile/icons/side-menu.svg"}
        alt={"menu"}
        width={22}
        height={14}
        onClick={toggleDrawer(true)}
        style={{ cursor: "pointer" }}
      />
      <Drawer open={open} onClose={toggleDrawer(false)} anchor={"right"}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
