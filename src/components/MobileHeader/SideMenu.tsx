"use client";

import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Image from "next/image";
import { useTranslations } from "next-intl";
import s from "./MobileHeader.module.scss";
import Link from "next/link";
import { useUserStore } from "@/store/user";
import { signOut } from "@firebase/auth";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLocale } from "use-intl";

export default function SideMenu(props: { currentUser: string }) {
  const currentLocale = useLocale();
  const router = useRouter();
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
          link={"/" + currentLocale + "/catalog"}
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
      (state) => state.setCurrentUserEmail,
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
      <Link href={"/"} className={s.header_sideLogo}>
        <Image alt={"logo"} src={"/logos/MusicDex-logo.svg"} fill={true} />
      </Link>
      <PagesList />
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
