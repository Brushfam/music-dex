import { ActivitiesIcon } from "@/app/[locale]/(private)/_components/Icons/ActivitiesIcon";
import { NftIcon } from "@/app/[locale]/(private)/_components/Icons/NftIcon";
import { OverviewIcon } from "@/app/[locale]/(private)/_components/Icons/OverviewIcon";
import { ProfileIcon } from "@/app/[locale]/(private)/_components/Icons/ProfileIcon";
import { RoyaltiesIcon } from "@/app/[locale]/(private)/_components/Icons/RoyaltiesIcon";
import { SongsIcon } from "@/app/[locale]/(private)/_components/Icons/SongsIcon";
import { ProfilePages } from "@/types/types";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import s from "./PagesList.module.scss";

export function PageList(props: {
  role: string;
  currentPage: ProfilePages;
  setCurrentPage: Dispatch<SetStateAction<ProfilePages>>;
}) {
  const t = useTranslations("ProfileInvestor.Sidebar");

  function getCurrentColor(page: ProfilePages) {
    return isCurrentPage(page) ? "rgb(246, 96, 31)" : "white";
  }

  function isCurrentPage(page: ProfilePages) {
    return props.currentPage === page;
  }

  const activeHoverBlockBg =
    "linear-gradient(90.00deg, rgb(246, 96, 31) -26%,rgba(17, 17, 17, 0) 91%)";

  // children property is using for icon component
  function PageRow(rowProps: {
    page: ProfilePages;
    children: React.ReactNode;
    title: string;
  }) {
    const hoverBlockBg = isCurrentPage(rowProps.page)
      ? {
          background: activeHoverBlockBg,
        }
      : {};

    return (
      <div
        className={s.pagesRow}
        onClick={() => {
          props.setCurrentPage(rowProps.page);
        }}
      >
        <div className={s.hoverBlock} style={hoverBlockBg} />
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

  return props.role === "investor" ? (
    <InvestorPagesList />
  ) : (
    <ArtistPagesList />
  );
}
