"use client";

import { DetailsBlock } from "@/app/[locale]/(public)/songs/[slug]/_components/Overview/DetailsBlock";
import { ListenOnBlock } from "@/app/[locale]/(public)/songs/[slug]/_components/Overview/ListenOnBlock";
import { RevenueSources } from "@/app/[locale]/(public)/songs/[slug]/_components/Overview/RevenueSources";
import { getSongOverview } from "@/services/songs";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import s from "./Overview.module.scss";

type OverviewData = {
  youtube_id: string;
  youtube: string;
  youtube_music: string;
  apple_music: string;
  spotify: string;
};

export function Overview(props: {
  slug: string;
  price: number;
  totalSupply: number;
}) {
  const t = useTranslations("Tracks.Overview");
  const opts = {
    height: "320",
    width: "100%",
    playerVars: {},
  };
  const emptyData: OverviewData = {
    apple_music: "",
    spotify: "",
    youtube: "",
    youtube_id: "",
    youtube_music: "",
  };
  const [overview, setOverview] = useState<OverviewData>(emptyData);

  useEffect(() => {
    getSongOverview(props.slug)
      .then((res) => {
        setOverview(res.data.overview);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.slug]);

  return (
    <div className={s.overview}>
      <div className={s.firstBlockWrapper}>
        <div className={s.videoWrapper}>
          <YouTube videoId={overview.youtube_id} opts={opts} />
        </div>
        <div className={s.streamsBlock}>
          <DetailsBlock
            slug={props.slug}
            price={props.price}
            totalSupply={props.totalSupply}
          />
          <ListenOnBlock
            youtube={overview.youtube}
            youtubeMusic={overview.youtube_music}
            apple={overview.apple_music}
            spotify={overview.spotify}
            text={t("listen_on")}
          />
        </div>
      </div>
      <div className={s.secondBlockWrapper}>
        <p className={s.secondBlockWrapper_title}>{t("revenue")}</p>
        <RevenueSources />
      </div>
    </div>
  );
}
