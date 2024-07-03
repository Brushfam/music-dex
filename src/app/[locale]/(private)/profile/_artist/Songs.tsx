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
          lastDate={"Dec 21, 2024"}
          song={"Стіни"}
          tokens={12}
          invested={24}
          songLink={"/en"}
        />
      </div>
    </PageWrapper>
  );
}
