"use client";

import { AboutArtist } from "@/app/[locale]/(public)/songs/[slug]/_components/AboutArtist/AboutArtist";
import { Overview } from "@/app/[locale]/(public)/songs/[slug]/_components/Overview/Overview";
import { Royalties } from "@/app/[locale]/(public)/songs/[slug]/_components/Royalties/Royalties";
import { Statistics } from "@/app/[locale]/(public)/songs/[slug]/_components/Statistics/Statistics";
import { useTranslations } from "next-intl";
import { useState } from "react";
import s from "./SubpagesBlock.module.scss";

enum TrackSubpages {
  Overview = "Overview",
  Royalties = "Royalties",
  Statistics = "Statistics",
  AboutArtist = "AboutArtist",
}

export function SubpagesBlock(props: {
  slug: string;
  totalSupply: number;
  price: number;
}) {
  const t = useTranslations("Catalog");
  const [currentPage, setCurrentPage] = useState(TrackSubpages.Overview);

  function getColor(title: string) {
    return currentPage === title
      ? {
          color: "rgb(246, 96, 31)",
          borderBottom: "1px solid",
          borderImage:
            "linear-gradient(90deg," +
            " rgba(246, 96, 31, 0) 0%," +
            " rgba(246, 96, 31, 0.8) 50%," +
            " rgba(246, 96, 31, 0) 100%" +
            ") 15",
        }
      : { color: "white", cursor: "pointer" };
  }

  function TabsRow() {
    return (
      <div className={s.tabsRow}>
        <div className={s.tabsSubRow}>
          <p
            style={getColor("Overview")}
            onClick={() => {
              setCurrentPage(TrackSubpages.Overview);
            }}
          >
            {t("TabRow.overview")}
          </p>
          <p
            style={getColor("Royalties")}
            onClick={() => {
              setCurrentPage(TrackSubpages.Royalties);
            }}
          >
            {t("TabRow.royalties")}
          </p>
        </div>
        <div className={s.tabsSubRow}>
          <p
            style={getColor("Statistics")}
            onClick={() => {
              setCurrentPage(TrackSubpages.Statistics);
            }}
          >
            {t("TabRow.statistics")}
          </p>
          <p
            style={getColor("AboutArtist")}
            onClick={() => {
              setCurrentPage(TrackSubpages.AboutArtist);
            }}
          >
            {t("TabRow.about")}
          </p>
        </div>
      </div>
    );
  }

  function CurrentSubPage() {
    if (currentPage === "Overview") {
      return (
        <Overview
          slug={props.slug}
          price={props.price}
          totalSupply={props.totalSupply}
        />
      );
    } else if (currentPage === "Royalties") {
      return <Royalties />;
    } else if (currentPage === "Statistics") {
      return <Statistics slug={props.slug} />;
    } else return <AboutArtist slug={props.slug} />;
  }

  return (
    <div className={s.additionalInfoWrapper}>
      <TabsRow />
      <CurrentSubPage />
    </div>
  );
}
