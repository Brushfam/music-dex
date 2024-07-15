import s from "@/app/[locale]/(public)/tracks/_components/Overview/Overview.module.scss";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export function ListenOnBlock() {
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
