"use client";

import cs from "../../../../../commonStyles.module.scss";
import s from "./PageTemplate.module.scss";
import { Labels } from "@/components/Labels/Labels";
import { TrackDetails } from "@/components/TrackDetails/TrackDetails";
import { SharesBlock } from "@/app/[locale]/(public)/tracks/_components/SharesBlock/SharesBlock";
import FaqSection from "@/components/Faq/FaqSection/FaqSection";
import React, { useState } from "react";
import { trackDataType } from "@/types/types";
import { useTranslations } from "next-intl";
import { useLocale } from "use-intl";
import { VideoSection } from "@/app/[locale]/(public)/tracks/_components/VideoSection/VideoSection";
import { ApprovePurchaseModal } from "@/components/modals/ApprovePurchaseModal/ApprovePurchaseModal";
import {Overview} from "@/app/[locale]/(public)/tracks/_components/Overview/Overview";
import {Royalties} from "@/app/[locale]/(public)/tracks/_components/Royalties/Royalties";
import {Statistics} from "@/app/[locale]/(public)/tracks/_components/Statistics/Statistics";
import {AboutArtist} from "@/app/[locale]/(public)/tracks/_components/AboutArtist/AboutArtist";

type PageTemplateProps = {
  artist: string;
  songName: string;
  tokenAddress: string;
  trackDataEN: trackDataType;
  trackDataUK: trackDataType;
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
  const [approvePurchaseModal, setApprovePurchaseModal] = useState("");
  const [currentPage, setCurrentPage] = useState(TrackSubpages.Overview);

  function TrackDescription() {
    return (
      <div className={s.trackDescription}>
        <p className={s.titleText} style={{ marginBottom: 16 }}>
          {props.songName}
        </p>
        <Labels
          author={props.artist}
          genre={t("song_genre")}
          location={t("song_location")}
        />
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
      ? { color: "rgb(246, 96, 31)" }
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
          {/*<p*/}
          {/*  style={getColor("Statistics")}*/}
          {/*  onClick={() => {*/}
          {/*    setCurrentPage(TrackSubpages.Statistics);*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {t("TabRow.statistics")}*/}
          {/*</p>*/}
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
      return <Overview videoId={"Jb5qdg30jSU"} />;
    } else if (currentPage === "Royalties") {
      return <Royalties />;
    } else if (currentPage === "Statistics") {
      return <Statistics />;
    } else return <AboutArtist />;
  }

  return (
    <div className={cs.main}>
      {approvePurchaseModal.length ? (
        <ApprovePurchaseModal
          orderUrl={approvePurchaseModal}
          setModal={setApprovePurchaseModal}
        />
      ) : null}
      <div className={s.sectionWrapper}>
        <div className={s.bg}></div>
        <div className={s.trackPageSection}>
          <div className={s.info}>
            <div
              className={
                props.songName === "Дилер"
                  ? s.trackCoverDealer
                  : s.trackCoverUKSun
              }
            >
              <p className={s.titleText}>{props.artist}</p>
              <p className={s.trackCover_songName}>{props.songName}</p>
            </div>
            <TrackDescription />
            <SharesBlock
              price={trackData.price}
              tokenAddress={props.tokenAddress}
              tokenName={props.songName}
              setApprovePurchaseModal={setApprovePurchaseModal}
            />
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
