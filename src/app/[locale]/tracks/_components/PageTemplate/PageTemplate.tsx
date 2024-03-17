"use client";

import cs from "../../../../commonStyles.module.scss";
import s from "./PageTemplate.module.scss";
import { Labels } from "@/components/Labels/Labels";
import { TrackDetails } from "@/components/TrackDetails/TrackDetails";
import { SharesBlock } from "@/app/[locale]/tracks/_components/SharesBlock/SharesBlock";
import Faq from "@/components/Faq/Faq";
import { Footer } from "@/components/Footer/Footer";
import React, { useState } from "react";
import { trackDataType } from "@/types/types";
import { AgreementModal } from "@/components/AgreementModal/AgreementModal";

type PageTemplateProps = {
  children?: React.ReactNode;
  artist: string;
  songName: string;
  tokenAddress: string;
  trackData: trackDataType;
};

export function PageTemplate(props: PageTemplateProps) {
  const [agreementModal, setAgreementModal] = useState(false);

  function TrackDescription() {
    return (
      <div className={s.trackDescription}>
        <p className={s.titleText} style={{ marginBottom: 16 }}>
          {props.songName}
        </p>
        <Labels author={props.artist} genre={"Rap"} location={"Ukraine"} />
        <p className={s.descriptionText}>{props.trackData.description}</p>
        <p
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "white",
            marginBottom: 8,
          }}
        >
          DETAILS
        </p>
        <TrackDetails dataEN={props.trackData} dataUK={props.trackData} />
      </div>
    );
  }

  return (
    <div className={cs.main}>
      {agreementModal ? <AgreementModal setModal={setAgreementModal} /> : null}
      <div className={s.sectionWrapper}>
        <div className={s.bg}></div>
        <div className={s.trackPageSection}>
          <div className={s.info}>
            <div className={s.trackCover}>
              <p className={s.titleText}>{props.artist}</p>
              <p className={s.trackCover_songName}>{props.songName}</p>
            </div>
            <TrackDescription />
            <SharesBlock
              price={props.trackData.price}
              tokenAddress={props.tokenAddress}
              tokenName={props.songName}
              setModal={setAgreementModal}
            />
          </div>
        </div>
      </div>
      {props.children}
      <Faq />
      <Footer />
    </div>
  );
}
