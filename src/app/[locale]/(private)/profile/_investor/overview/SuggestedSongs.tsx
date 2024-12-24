"use client";

import { Button } from "@/components/ui/Button/Button";
import { getCatalog } from "@/services/songs";
import { ICatalogData, ISongData } from "@/types/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "use-intl";
import s from "./Overview.module.scss";

export function SuggestedSongs(props: { songs: ISongData[] }) {
  const t = useTranslations("ProfileInvestor.Overview");
  const currentLocale = useLocale();
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState<ICatalogData[]>([]);

  useEffect(() => {
    async function fetchCatalogData() {
      try {
        setLoading(true);
        const res = await getCatalog();
        console.log(res.data.catalog);
        setSongs(res.data.catalog);
      } catch (error) {
        console.error("Error fetching catalog:", error);
        return null;
      } finally {
        setLoading(false);
      }
    }

    fetchCatalogData();
  }, [t]);

  const showingSongs = useMemo(
    () =>
      songs.filter((song) => !props.songs.some((s) => s.slug === song.slug)),
    [props.songs, songs]
  );

  return (
    <div className={s.suggestedSongs}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: 10,
        }}
      >
        <p className={s.title}>{t("suggestions")}</p>
        <Button
          title={t("invest")}
          color={"main"}
          arrow={false}
          path={"/songs"}
        />
      </div>
      <div className={s.suggestedSongs_list}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          showingSongs?.map((song) => (
            <a
              key={song.slug}
              href={"/" + currentLocale + "/songs/dealer"}
              className={s.suggestedSongs_song}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <p className={s.suggestedSongs_text1}>{song?.song_name}</p>
                <p className={s.suggestedSongs_text2}>{song?.rightsholder}</p>
              </div>
              <Image
                src={"/icons/arrow-link.svg"}
                alt={"arrow"}
                width={10}
                height={10}
              />
            </a>
          ))
        )}
      </div>
    </div>
  );
}
