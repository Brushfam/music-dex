"use client";

import { useTranslations } from "next-intl";
import { PageWrapper } from "@/app/[locale]/(private)/profile/PageWrapper";
import s from "@/app/[locale]/(private)/profile/_artist/songs/Songs.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { useRouter } from "next/navigation";
import { SongHeader } from "@/app/[locale]/(private)/profile/_artist/songs/SongHeader";
import { ArtistSong } from "@/types/types";
import { SongRow } from "@/app/[locale]/(private)/profile/_artist/songs/SongRow";
import {getUserSongs} from "@/services/users/users";

export function Songs() {
  const t = useTranslations("ProfileArtist.Songs");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState<ArtistSong[]>([]);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const response = await getUserSongs(token);
        console.log(response.data.songData)
        setSongs(response.data.songData);
      } else {
        router.replace("/en/auth/login?expired-session=true");
      }
      setLoading(false);
    });
  }, [router, t]);

  function EmptySongList() {
    return (
      <div style={{ width: "100%", height: 300 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            src={"/profile/empty-list/statistics.svg"}
            alt={"icon"}
            width={50}
            height={50}
          />
          <p style={{color: "white", marginTop: 6}}>{t("empty_song_list")}</p>
        </div>
      </div>
    );
  }

  return (
    <PageWrapper title={t("title")} height={"auto"} loading={loading}>
      <div className={s.titleBlock}>
        <p className={s.titleBlock_text}>{t("list_title")}</p>
      </div>
      {songs.length ? (
        <div
          style={{ display: "flex", flexDirection: "column", minWidth: 530 }}
        >
          <SongHeader />
          {songs.map((song, i) => {
            return <SongRow key={i.toString()} songData={song} />;
          })}
        </div>
      ) : (
        <EmptySongList />
      )}
    </PageWrapper>
  );
}
