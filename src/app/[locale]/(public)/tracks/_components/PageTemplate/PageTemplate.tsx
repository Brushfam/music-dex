"use client";

import cs from "../../../../../commonStyles.module.scss";
import s from "./PageTemplate.module.scss";
import { Labels } from "@/components/Labels/Labels";
import { TrackDetails } from "@/components/TrackDetails/TrackDetails";
import { SharesBlock } from "@/app/[locale]/(public)/tracks/_components/SharesBlock/SharesBlock";
import FaqSection from "@/components/Faq/FaqSection/FaqSection";
import React, { useState } from "react";
import { streamingServices, trackDataType } from "@/types/types";
import { useTranslations } from "next-intl";
import { useLocale } from "use-intl";
import { ApprovePurchaseModal } from "@/components/modals/ApprovePurchaseModal/ApprovePurchaseModal";
import { Overview } from "@/app/[locale]/(public)/tracks/_components/Overview/Overview";
import { Royalties } from "@/app/[locale]/(public)/tracks/_components/Royalties/Royalties";
import { Statistics } from "@/app/[locale]/(public)/tracks/_components/Statistics/Statistics";
import { AboutArtist } from "@/app/[locale]/(public)/tracks/_components/AboutArtist/AboutArtist";
import { NoWalletsModal } from "@/components/modals/NoWalletsModal/NoWalletsModal";
import { Donate } from "@/app/[locale]/(public)/tracks/_components/Donate/Donate";

type PageTemplateProps = {
  artist: string;
  songName: string;
  tokenAddress: string;
  pathToCover: string;
  youtubeId: string;
  services: streamingServices;
  songId: number;
  trackDataEN: trackDataType;
  trackDataUK: trackDataType;
  coverTop?: boolean;
};

enum TrackSubpages {
  Overview = "Overview",
  Royalties = "Royalties",
  Statistics = "Statistics",
  AboutArtist = "AboutArtist",
}

export function PageTemplate(props: PageTemplateProps) {
  const t = useTranslations("Catalog");
  const currentLocale = useLocale();
  const trackData =
    currentLocale === "uk" ? props.trackDataUK : props.trackDataEN;
  const [currentPage, setCurrentPage] = useState(TrackSubpages.Overview);

  function TrackDescription() {
    return (
      <div className={s.trackDescription}>
        <p className={s.titleText} style={{ marginBottom: 16 }}>
          {props.songName}
        </p>
        <Labels genre={props.trackDataEN.genre} location={t("song_location")} />
        <p className={s.descriptionText}>{trackData.description}</p>
        <p
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "white",
            marginBottom: 8,
          }}
        >
          {t("details")}
        </p>
        <TrackDetails dataEN={props.trackDataEN} dataUK={props.trackDataUK} />
      </div>
    );
  }

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
          videoId={props.youtubeId}
          tokenAddress={props.tokenAddress}
          services={props.services}
          price={props.trackDataEN.price * 10}
          totalSupply={Number(props.trackDataEN.details[3].value)}
        />
      );
    } else if (currentPage === "Royalties") {
      return <Royalties />;
    } else if (currentPage === "Statistics") {
      return <Statistics songId={props.songId} />;
    } else
      return (
        <AboutArtist dataEN={props.trackDataEN} dataUK={props.trackDataUK} />
      );
  }

  const coverStyle = {
    backgroundImage: `url(${props.pathToCover})`,
    backgroundPosition: props.coverTop ? "top" : "center",
  };

  return (
    <div className={cs.main}>
      <ApprovePurchaseModal />
      <NoWalletsModal />
      <div className={s.sectionWrapper}>
        <div className={s.bg}></div>
        <div className={s.trackPageSection}>
          <div className={s.info}>
            <div style={coverStyle} className={s.trackCover}>
              <p className={s.titleText}>{props.artist}</p>
              <p className={s.trackCover_songName}>{props.songName}</p>
            </div>
            <TrackDescription />
            <div className={s.buyAndDonateBlock}>
              <SharesBlock
                price={trackData.price}
                tokenAddress={props.tokenAddress}
                songId={props.songId}
                tokenName={props.songName}
              />
              <Donate donateLink={props.trackDataEN.donateLink} />
            </div>
          </div>
        </div>
      </div>
      <div className={s.additionalInfoWrapper}>
        <TabsRow />
        <CurrentSubPage />
      </div>
      <FaqSection />
    </div>
  );
}
