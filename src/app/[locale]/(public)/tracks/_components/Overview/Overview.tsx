import s from "./Overview.module.scss";
import YouTube from "react-youtube";
import React from "react";
import { useTranslations } from "next-intl";
import { RevenueSources } from "@/app/[locale]/(public)/tracks/_components/Overview/RevenueSources";
import { ListenOnBlock } from "@/app/[locale]/(public)/tracks/_components/Overview/ListenOnBlock";
import { DetailsBlock } from "@/app/[locale]/(public)/tracks/_components/Overview/DetailsBlock";
import { streamingServices } from "@/types/types";

export function Overview(props: {
  videoId: string;
  tokenAddress: string;
  services: streamingServices;
  price: number
  totalSupply: number
}) {
  const t = useTranslations("Tracks.Overview");
  const opts = {
    height: "320",
    width: "100%",
    playerVars: {},
  };

  return (
    <div className={s.overview}>
      <div className={s.firstBlockWrapper}>
        <div className={s.videoWrapper}>
          <YouTube videoId={props.videoId} opts={opts} />
        </div>
        <div className={s.streamsBlock}>
          <DetailsBlock tokenAddress={props.tokenAddress} price={props.price} totalSupply={props.totalSupply} />
          <ListenOnBlock services={props.services} />
        </div>
      </div>
      <div className={s.secondBlockWrapper}>
        <p className={s.secondBlockWrapper_title}>{t("revenue")}</p>
        <RevenueSources />
      </div>
    </div>
  );
}
