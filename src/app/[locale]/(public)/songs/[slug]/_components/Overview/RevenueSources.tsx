import s from "@/app/[locale]/(public)/songs/[slug]/_components/Overview/Overview.module.scss";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

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

export function RevenueSources() {
  const t = useTranslations("Tracks.Overview");

  return (
    <div className={s.revenueSources}>
      <Image
        src={"/tracks/revenue/revenue-sources-line.svg"}
        alt={"line"}
        width={761}
        height={415}
        className={s.line}
      />
      <Revenue title={"Apple Music"} description={t("revenue1_description")}>
        <Image
          src={"/tracks/revenue/revenue-apple.svg"}
          alt={"apple"}
          width={32}
          height={32}
        />
      </Revenue>
      <Revenue title={"YouTube Music"} description={t("revenue2_description")}>
        <Image
          src={"/tracks/revenue/revenue-youtube.svg"}
          alt={"youtube"}
          width={20}
          height={25}
        />
      </Revenue>
      <Revenue title={"Spotify"} description={t("revenue3_description")}>
        <Image
          src={"/tracks/revenue/revenue-spotify.svg"}
          alt={"spotify"}
          width={26}
          height={16}
        />
      </Revenue>
    </div>
  );
}
