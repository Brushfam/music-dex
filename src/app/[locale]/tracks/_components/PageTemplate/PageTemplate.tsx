"use client";

import cs from "../../../../commonStyles.module.scss";
import s from "./PageTemplate.module.scss";
import { Labels } from "@/components/Labels/Labels";
import { TrackDetails } from "@/components/TrackDetails/TrackDetails";
import { SharesBlock } from "@/app/[locale]/tracks/_components/SharesBlock/SharesBlock";
import FaqSection from "@/components/Faq/FaqSection/FaqSection";
import { Footer } from "@/components/Footer/Footer";
import React, { useState } from "react";
import { trackDataType } from "@/types/types";
import { AgreementModal } from "@/components/modals/AgreementModal/AgreementModal";
import { useTranslations } from "next-intl";
import { useLocale } from "use-intl";
import { VideoSection } from "@/app/[locale]/tracks/_components/VideoSection/VideoSection";
import { LowBalanceModal } from "@/components/modals/LowBalanceModal/LowBalanceModal";
import { UseUser } from "@/context/UserContext";

type PageTemplateProps = {
  children?: React.ReactNode;
  artist: string;
  songName: string;
  tokenAddress: string;
  trackDataEN: trackDataType;
  trackDataUK: trackDataType;
};

export function PageTemplate(props: PageTemplateProps) {
  const t = useTranslations("Catalog");
  const userContext = UseUser();
  const currentLocale = useLocale();
  const trackData =
    currentLocale === "uk" ? props.trackDataUK : props.trackDataEN;
  const [agreementModal, setAgreementModal] = useState(false);
  const [lowBalanceModal, setLowBalanceModal] = useState(false);

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

  return (
    <div className={cs.main}>
      {lowBalanceModal ? (
        <LowBalanceModal
          setModal={setLowBalanceModal}
          wallet={userContext.wallet}
        />
      ) : null}
      {agreementModal ? <AgreementModal setModal={setAgreementModal} /> : null}
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
              setAgreementModal={setAgreementModal}
              setLowBalanceModal={setLowBalanceModal}
            />
          </div>
        </div>
      </div>
      <VideoSection />
      {props.children}
      <FaqSection />
      <Footer />
    </div>
  );
}
