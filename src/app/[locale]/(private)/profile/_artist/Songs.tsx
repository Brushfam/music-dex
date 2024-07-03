import { useTranslations } from "next-intl";
import { PageWrapper } from "@/app/[locale]/(private)/profile/PageWrapper";
import s from "@/app/[locale]/(private)/profile/_artist/songs/Songs.module.scss";
import {SongRow1} from "@/app/[locale]/(private)/profile/_artist/songs/SongRows";
import { SongHeader } from "@/app/[locale]/(private)/profile/_artist/songs/SongHeader";

export function Songs() {
  const t = useTranslations("ProfileArtist.Songs");
  return (
    <PageWrapper title={"Uploaded songs"} height={"auto"} loading={false}>
      <div style={{ display: "flex", flexDirection: "column", minWidth: 530 }}>
        <div className={s.titleBlock}>
          <p className={s.titleBlock_text}>{"List of songs"}</p>
        </div>
        <SongHeader />
        <SongRow1
          lastDate={"May 19, 2023"}
          song={"Стіни"}
          tokens={4091}
          invested={23991.3}
          songLink={"/en"}
          chartNumber={0}
        />
        <SongRow1
            lastDate={"Nov 27, 2020"}
            song={"Зорі"}
            tokens={5392}
            invested={19499.9}
            songLink={"/en"}
            chartNumber={1}
        />
        <SongRow1
            lastDate={"May 21, 2024"}
            song={"Додому"}
            tokens={7702}
            invested={24084.1}
            songLink={"/en"}
            chartNumber={2}
        />
      </div>
    </PageWrapper>
  );
}
