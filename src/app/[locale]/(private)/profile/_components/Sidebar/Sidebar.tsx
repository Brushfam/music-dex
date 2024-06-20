"use client";

import s from "./Sidebar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { OverviewIcon } from "@/app/[locale]/(private)/profile/_components/Icons/OverviewIcon";
import { SongsIcon } from "@/app/[locale]/(private)/profile/_components/Icons/SongsIcon";
import { RoyaltiesIcon } from "@/app/[locale]/(private)/profile/_components/Icons/RoyaltiesIcon";
import { ProfileIcon } from "@/app/[locale]/(private)/profile/_components/Icons/ProfileIcon";
import { ProfilePages } from "@/types/types";
import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";

export function Sidebar(props: {
  currentPage: ProfilePages;
  setCurrentPage: Dispatch<SetStateAction<ProfilePages>>;
}) {
  const t = useTranslations("ProfileInvestor");
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

  function PagesList() {
    return (
      <div className={s.pagesList}>
        <div className={s.pagesRow}>
          <div className={s.hoverBlock}></div>
          <OverviewIcon color={"rgb(68, 68, 68)"} />
          <p style={{ color: "rgb(68, 68, 68)" }}>Overview</p>
        </div>
        <div
          className={s.pagesRow}
          onClick={() => {
            props.setCurrentPage(ProfilePages.Songs);
          }}
        >
          <div className={s.hoverBlock}></div>
          <SongsIcon color={getCurrentColor(ProfilePages.Songs)} />
          <p style={{ color: getCurrentColor(ProfilePages.Songs) }}>Songs</p>
        </div>
        <div className={s.pagesRow}>
          <div className={s.hoverBlock}></div>
          <RoyaltiesIcon color={"rgb(68, 68, 68)"} />
          <p style={{ color: "rgb(68, 68, 68)" }}>Royalties</p>
        </div>
        <div
          className={s.pagesRow}
          onClick={() => {
            props.setCurrentPage(ProfilePages.Settings);
          }}
        >
          <div className={s.hoverBlock}></div>
          <ProfileIcon color={getCurrentColor(ProfilePages.Settings)} />
          <p style={{ color: getCurrentColor(ProfilePages.Settings) }}>
            My profile
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={s.sidebar}>
      <Logo />
      <PagesList />
    </div>
  );
}
