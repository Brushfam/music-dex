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
          <p>$2.2</p>
        </div>
        <div className={s.details}>
          <p>{t("total_purchased_tokens")}</p>
          <p>6</p>
        </div>
        <div className={s.details}>
          <p>{t("tokens_remaining")}</p>
          <p>9,994</p>
        </div>
      </div>
    );
  }

  function ListenOnBlock() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className={s.listenOn}>
          <Link
            href={"https://youtu.be/Jb5qdg30jSU?si=S3Zrl15hXdy97_CP"}
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
              "https://music.apple.com/us/album/%D0%B4%D0%B8%D0%BB%D0%B5%D1%80-single/1735502812"
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
              "https://music.youtube.com/playlist?list=OLAK5uy_kk-5lk0jb0o0TAqFgYzDwM2I7JvGuyhlo&si=POEggXulYwj-Hj9J"
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
              "https://open.spotify.com/album/5zerH7hovdbLXVOn57gs8c?si=jsuowanBTk2wZMlsdBMD5Q"
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
          <Image src={"/tracks/revenue-sources-line.svg"} alt={"line"} width={761} height={415} className={s.line} />
        <Revenue title={"Apple Music"} description={t("revenue1_description")}>
          <Image
            src={"/tracks/revenue-apple.svg"}
            alt={"apple"}
            width={32}
            height={32}
          />
        </Revenue>
        <Revenue title={"YouTube Music"} description={t("revenue2_description")}>
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
