import s from "./VideoSection.module.scss"
import { YoutubeVideo } from "@/app/[locale]/(public)/tracks/_components/VideoSection/YoutubeVideo";
import { AboutArtist } from "@/app/[locale]/(public)/tracks/_components/VideoSection/AboutArtist";
import React from "react";
import { useTranslations } from "next-intl";

export function VideoSection() {
  const t = useTranslations("Catalog");

  return (
    <div className={s.sectionWrapper}>
      <div className={s.videoSectionContainer}>
        <div className={s.videoContainer}>
          <p
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "white",
            }}
          >
            {t("watch_video")}
          </p>
          <YoutubeVideo id={"Jb5qdg30jSU"} />
        </div>
        <AboutArtist />
      </div>
    </div>
  );
}
