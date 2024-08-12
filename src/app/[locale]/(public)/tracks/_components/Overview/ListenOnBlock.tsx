import s from "@/app/[locale]/(public)/tracks/_components/Overview/Overview.module.scss";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { streamingServices } from "@/types/types";

export function ListenOnBlock(props: { services: streamingServices }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={s.listenOn}>
        <Link href={props.services.youtube} target={"_blank"}>
          <Image
            src={"/tracks/listen-on/youtube.svg"}
            alt={"youtube"}
            width={203}
            height={81}
          />
        </Link>
        <Link href={props.services.apple} target={"_blank"}>
          <Image
            src={"/tracks/listen-on/apple.svg"}
            alt={"apple"}
            width={203}
            height={81}
          />
        </Link>
      </div>
      <div className={s.listenOn}>
        <Link href={props.services.youtubeMusic} target={"_blank"}>
          <Image
            src={"/tracks/listen-on/youtube-music.svg"}
            alt={"youtube-music"}
            width={203}
            height={81}
          />
        </Link>
        <Link href={props.services.spotify} target={"_blank"}>
          <Image
            src={"/tracks/listen-on/spotify.svg"}
            alt={"spotify"}
            width={203}
            height={81}
          />
        </Link>
      </div>
    </div>
  );
}
