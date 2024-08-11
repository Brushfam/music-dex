"use client";

import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ProfilePages } from "@/types/types";
import s from "./MobileHeader.module.scss";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/user";
import { signOut } from "@firebase/auth";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PageList } from "@/app/[locale]/(private)/_components/PageList/PagesList";

export default function SideMenu(props: {
  currentPage: ProfilePages;
  setCurrentPage: Dispatch<SetStateAction<ProfilePages>>;
  role: string;
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const t = useTranslations("ProfileInvestor.Sidebar");

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
          router.replace("/en/auth/login");
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
      <PageList
        role={props.role}
        currentPage={props.currentPage}
        setCurrentPage={props.setCurrentPage}
      />
      <LogoutButton />
    </div>
  );

  return (
    <div className={s.sidebarWrapper}>
      <Image
        src={"/profile/icons/side-menu.svg"}
        alt={"menu"}
        width={20}
        height={13}
        onClick={toggleDrawer(true)}
        style={{ cursor: "pointer" }}
      />
      <Drawer open={open} onClose={toggleDrawer(false)} anchor={"right"}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
