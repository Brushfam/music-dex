"use client";

import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ProfilePages } from "@/types/types";
import s from "./MobileHeader.module.scss";
import { OverviewIcon } from "@/app/[locale]/(private)/profile/_components/Icons/OverviewIcon";
import { SongsIcon } from "@/app/[locale]/(private)/profile/_components/Icons/SongsIcon";
import { RoyaltiesIcon } from "@/app/[locale]/(private)/profile/_components/Icons/RoyaltiesIcon";
import { ProfileIcon } from "@/app/[locale]/(private)/profile/_components/Icons/ProfileIcon";
import { Dispatch, SetStateAction } from "react";
import { ActivitiesIcon } from "@/app/[locale]/(private)/profile/_components/Icons/ActivitiesIcon";
import Link from "next/link";
import { useUserStore } from "@/store/user";
import { signOut } from "@firebase/auth";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { NftIcon } from "@/app/[locale]/(private)/profile/_components/Icons/NftIcon";

export default function SideMenu(props: {
  currentPage: ProfilePages;
  setCurrentPage: Dispatch<SetStateAction<ProfilePages>>;
  role: string;
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const t = useTranslations("ProfileInvestor.Sidebar");

  function getCurrentColor(page: ProfilePages) {
    return props.currentPage === page ? "rgb(246, 96, 31)" : "white";
  }

  // children property is using for icon component
  function PageRow(rowProps: {
    page: ProfilePages;
    children: React.ReactNode;
    title: string;
  }) {
    return (
      <div
        className={s.pagesRow}
        onClick={() => {
          props.setCurrentPage(rowProps.page);
        }}
      >
        <div className={s.hoverBlock}></div>
        {rowProps.children}
        <p style={{ color: getCurrentColor(rowProps.page) }}>
          {rowProps.title}
        </p>
      </div>
    );
  }

  function InvestorPagesList() {
    return (
      <div className={s.pagesList}>
        <PageRow page={ProfilePages.Overview} title={t("overview")}>
          <OverviewIcon color={getCurrentColor(ProfilePages.Overview)} />
        </PageRow>
        <PageRow page={ProfilePages.Songs} title={t("songs")}>
          <SongsIcon color={getCurrentColor(ProfilePages.Songs)} />
        </PageRow>
        <PageRow page={ProfilePages.Royalties} title={t("royalties")}>
          <RoyaltiesIcon color={getCurrentColor(ProfilePages.Royalties)} />
        </PageRow>
        <PageRow page={ProfilePages.Activities} title={t("activities")}>
          <ActivitiesIcon color={getCurrentColor(ProfilePages.Activities)} />
        </PageRow>
        <PageRow page={ProfilePages.NFTs} title={t("nfts")}>
          <NftIcon color={getCurrentColor(ProfilePages.NFTs)} />
        </PageRow>
        <PageRow page={ProfilePages.Settings} title={t("profile")}>
          <ProfileIcon color={getCurrentColor(ProfilePages.Settings)} />
        </PageRow>
      </div>
    );
  }

  function ArtistPagesList() {
    return (
      <div className={s.pagesList}>
        <PageRow page={ProfilePages.Overview} title={t("overview")}>
          <OverviewIcon color={getCurrentColor(ProfilePages.Overview)} />
        </PageRow>
        <PageRow page={ProfilePages.Songs} title={t("songs")}>
          <SongsIcon color={getCurrentColor(ProfilePages.Songs)} />
        </PageRow>
        <PageRow page={ProfilePages.Settings} title={t("profile")}>
          <ProfileIcon color={getCurrentColor(ProfilePages.Settings)} />
        </PageRow>
        <PageRow page={ProfilePages.FAQ} title={"FAQ"}>
          <ActivitiesIcon color={getCurrentColor(ProfilePages.FAQ)} />
        </PageRow>
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
      <Link href={"/"} className={s.header_sideLogo}>
        <Image alt={"logo"} src={"/logos/MusicDex-logo.svg"} fill={true} />
      </Link>
      {props.role === "investor" ? <InvestorPagesList /> : <ArtistPagesList />}
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
