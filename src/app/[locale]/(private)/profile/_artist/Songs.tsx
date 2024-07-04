"use client"

import { useTranslations } from "next-intl";
import { PageWrapper } from "@/app/[locale]/(private)/profile/PageWrapper";
import s from "@/app/[locale]/(private)/profile/_artist/songs/Songs.module.scss";
import {SongRow1} from "@/app/[locale]/(private)/profile/_artist/songs/SongRows";
import { SongHeader } from "@/app/[locale]/(private)/profile/_artist/songs/SongHeader";
import {useLocale} from "use-intl";

export function Songs() {
  const currentLocale = useLocale();
  const isEN = currentLocale === "en"
  const t = useTranslations("ProfileArtist.Songs");

  return (
    <PageWrapper title={t("title")} height={"auto"} loading={false}>
      <div style={{ display: "flex", flexDirection: "column", minWidth: 530 }}>
        <div className={s.titleBlock}>
          <p className={s.titleBlock_text}>{t("list_title")}</p>
        </div>
        <SongHeader />
        <SongRow1
          lastDate={isEN ? "May 22, 2024" : "Травень 2, 2024"}
          song={"Стіни"}
          tokens={4091}
          invested={23991.3}
          songLink={"/en"}
          chartNumber={0}
        />
        <SongRow1
            lastDate={isEN ? "Feb 27, 2023" : "Лютий 27б 2023"}
            song={"Зорі"}
            tokens={5392}
            invested={19499.9}
            songLink={"/en"}
            chartNumber={1}
        />
        <SongRow1
            lastDate={isEN ? "Mar 21, 2024" : "Березень 21, 2024"}
            song={"Додому"}
            tokens={7702}
            invested={24084.1}
            songLink={"/en"}
            chartNumber={2}
        />
        <SongRow1
            lastDate={isEN ? "Oct 5, 2023" : "Жовтень 5, 2023"}
            song={"Вогонь горить"}
            tokens={2981}
            invested={17911.8}
            songLink={"/en"}
            chartNumber={3}
        />
      </div>
    </PageWrapper>
  );
}
