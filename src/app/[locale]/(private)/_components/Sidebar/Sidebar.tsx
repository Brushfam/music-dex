"use client";

import s from "./Sidebar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { OverviewIcon } from "@/app/[locale]/(private)/_components/Icons/OverviewIcon";
import { SongsIcon } from "@/app/[locale]/(private)/_components/Icons/SongsIcon";
import { RoyaltiesIcon } from "@/app/[locale]/(private)/_components/Icons/RoyaltiesIcon";
import { ProfileIcon } from "@/app/[locale]/(private)/_components/Icons/ProfileIcon";
import { ProfilePages } from "@/types/types";
import React, { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import { ActivitiesIcon } from "@/app/[locale]/(private)/_components/Icons/ActivitiesIcon";
import { NftIcon } from "@/app/[locale]/(private)/_components/Icons/NftIcon";

export function Sidebar(props: {
  currentPage: ProfilePages;
  setCurrentPage: Dispatch<SetStateAction<ProfilePages>>;
  role: string;
}) {
  const t = useTranslations("ProfileInvestor.Sidebar");
  function Logo() {
    return (
      <div className={s.logoWrapper}>
        <div className={s.logoBlock}>
          <Link href={"/"} className={s.logo}>
            <Image alt={"logo"} src={"/logos/MusicDex-logo.svg"} fill={true} />
          </Link>
        </div>
      </div>
    );
  }

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

  return (
    <div className={s.sidebar}>
      <Logo />
      {props.role === "investor" ? <InvestorPagesList /> : <ArtistPagesList />}
    </div>
  );
}
