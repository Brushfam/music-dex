"use client";

import { PageWrapper } from "@/app/[locale]/(private)/profile/PageWrapper";
import { SongHeader } from "@/app/[locale]/(private)/profile/_investor/songs/SongHeader";
import { SongRow } from "@/app/[locale]/(private)/profile/_investor/songs/SongRow";
import s from "@/app/[locale]/(private)/profile/_investor/songs/Songs.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { getUserSongs } from "@/services/users/users";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "use-intl";

interface SongsData {
  date: string;
  name: string;
  tokens: number;
  invested: number;
  slug: string;
}

export default function Songs() {
  const t = useTranslations("ProfileInvestor.Songs");
  const router = useRouter();
  const currentLocale = useLocale();

  const [songs, setSongs] = useState<SongsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const response = await getUserSongs(token);
        setSongs(response.data.songs);
        setLoading(false);
      } else {
        router.replace("/en/auth/login?expired-session=true");
      }
    });
  }, [router]);

  function NoSongBlock() {
    return (
      <div className={s.noSongBlock}>
        <p className={s.noSongBlock_title}>{t("no_songs")}</p>
        <p className={s.noSongBlock_description}>{t("choose_song")}</p>
        <Button
          title={t("invest")}
          color={"main"}
          arrow={false}
          path={"/songs"}
        />
      </div>
    );
  }

  function SongList() {
    return songs.length ? (
      <div style={{ display: "flex", flexDirection: "column", minWidth: 530 }}>
        <div className={s.titleBlock}>
          <p className={s.titleBlock_text}>{t("list_of_songs")}</p>
          <Button
            title={t("invest")}
            color={"main"}
            arrow={false}
            path={"/songs"}
          />
        </div>
        <SongHeader />
        {songs.map((song, i) => {
          return (
            <SongRow
              key={i.toString()}
              lastDate={song.date}
              song={song.name}
              tokens={song.tokens}
              invested={song.invested}
              songLink={"/" + currentLocale + "/songs/" + song.slug}
            />
          );
        })}
      </div>
    ) : (
      <NoSongBlock />
    );
  }

  return (
    <PageWrapper title={t("title")} height={"auto"} loading={loading}>
      <SongList />
    </PageWrapper>
  );
}
