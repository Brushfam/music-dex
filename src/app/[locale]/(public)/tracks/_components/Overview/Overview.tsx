import s from "./Overview.module.scss";
import YouTube from "react-youtube";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";

export function Overview(props: { videoId: string }) {
  const t = useTranslations("Tracks.Overview");
  const opts = {
    height: "320",
    width: "100%",
    playerVars: {},
  };

  function DetailsBlock() {
    return (
      <div className={s.detailsBlock}>
        <div className={s.details}>
          <p>{t("price_per_token")}</p>
          <p>$5</p>
        </div>
        <div className={s.details}>
          <p>{t("total_purchased_tokens")}</p>
          <p>2,920</p>
        </div>
        <div className={s.details}>
          <p>{t("tokens_remaining")}</p>
          <p>7,080</p>
        </div>
      </div>
    );
  }

  function ListenOnBlock() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className={s.listenOn}>
          <Link
            href={"https://www.youtube.com/watch?v=OF7bh0Y3vyo"}
            target={"_blank"}
          >
            <Image
              src={"/tracks/youtube.svg"}
              alt={"youtube"}
              width={203}
              height={81}
            />
          </Link>
          <Link
            href={
              "https://music.apple.com/by/album/%D0%B4%D0%BE%D0%B4%D0%BE%D0%BC%D1%83-feat-skofka/1576323793?i=1576324037"
            }
            target={"_blank"}
          >
            <Image
              src={"/tracks/apple.svg"}
              alt={"apple"}
              width={203}
              height={81}
            />
          </Link>
        </div>
        <div className={s.listenOn}>
          <Link
            href={
              "https://music.youtube.com/watch?v=Qn4OT_EK7jk&si=n7bJ-sfm24S9XLJd"
            }
            target={"_blank"}
          >
            <Image
              src={"/tracks/youtube-music.svg"}
              alt={"youtube-music"}
              width={203}
              height={81}
            />
          </Link>
          <Link
            href={
              "https://open.spotify.com/track/7kKTYTHULdERuHGCkVyLVD?si=ad61546ad49048af"
            }
            target={"_blank"}
          >
            <Image
              src={"/tracks/spotify.svg"}
              alt={"spotify"}
              width={203}
              height={81}
            />
          </Link>
        </div>
      </div>
    );
  }

  function Revenue(props: {
    children: React.ReactNode;
    title: string;
    description: string;
  }) {
    return (
      <div className={s.revenue}>
        <div className={s.revenue_titleBlock}>
          {props.children}
          <p className={s.revenue_title}>{props.title}</p>
        </div>
        <p className={s.revenue_description}>{props.description}</p>
      </div>
    );
  }

  function RevenueSources() {
    return (
      <div className={s.revenueSources}>
        <Image
          src={"/tracks/revenue-sources-line.svg"}
          alt={"line"}
          width={761}
          height={415}
          className={s.line}
        />
        <Revenue title={"Apple Music"} description={t("revenue1_description")}>
          <Image
            src={"/tracks/revenue-apple.svg"}
            alt={"apple"}
            width={32}
            height={32}
          />
        </Revenue>
        <Revenue
          title={"YouTube Music"}
          description={t("revenue2_description")}
        >
          <Image
            src={"/tracks/revenue-youtube.svg"}
            alt={"youtube"}
            width={20}
            height={25}
          />
        </Revenue>
        <Revenue title={"Spotify"} description={t("revenue3_description")}>
          <Image
            src={"/tracks/revenue-spotify.svg"}
            alt={"spotify"}
            width={26}
            height={16}
          />
        </Revenue>
      </div>
    );
  }

  return (
    <div className={s.overview}>
      <div className={s.firstBlockWrapper}>
        <div className={s.videoWrapper}>
          <YouTube videoId={props.videoId} opts={opts} />
        </div>
        <div className={s.streamsBlock}>
          <DetailsBlock />
          <ListenOnBlock />
        </div>
      </div>
      <div className={s.secondBlockWrapper}>
        <p className={s.secondBlockWrapper_title}>{t("revenue")}</p>
        <RevenueSources />
      </div>
    </div>
  );
}
