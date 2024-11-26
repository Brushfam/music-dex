import { Button } from "@/components/ui/Button/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useState } from "react";
import s from "./Overview.module.scss";

interface SongItemProps {
  title: string;
  artist: string;
  tokens: number;
}
function SongItem({ title, artist, tokens }: SongItemProps) {
  const t = useTranslations("ProfileInvestor.Overview.ListOfSongs");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className={s.songItem} onClick={handleToggle}>
      <div className={s.tableRow}>
        <div className={s.song}>
          <div className={s.artist}>{artist}</div>
          <div className={s.title}>{title}</div>
        </div>
        <div className={s.tokens}>{tokens}</div>
        <div className={s.action}>
          <Image
            src={"/icons/arrow-link.svg"}
            alt={"arrow"}
            width={10}
            height={10}
          />
        </div>
      </div>
      {isOpen && (
        <div className={s.songDetailed}>
          <div className={s.songDetailedRow}>
            <div className={s.songDetailedLeft}>{t("detailed.date")}</div>
            <div className={s.songDetailedRight}>December 21, 2024</div>
          </div>
          <div className={s.songDetailedRow}>
            <div className={s.songDetailedLeft}>{t("detailed.purchase")}</div>
            <div className={s.songDetailedRight}>10.01.2024</div>
          </div>
          <div className={s.songDetailedRow}>
            <div className={s.songDetailedLeft}>{t("detailed.invested")}</div>
            <div className={s.songDetailedRight}>$40</div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ListOfSongs() {
  const t = useTranslations("ProfileInvestor.Overview.ListOfSongs");
  const songs = [
    { artist: "Lana Del Rey", title: "West Coast", tokens: 1.2 },
    { artist: "Lana Del Rey", title: "West Coast", tokens: 1.2 },
    { artist: "Lana Del Rey", title: "West Coast", tokens: 1.2 },
  ];

  return (
    <div className={s.listOfSongs}>
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
        <p className={s.title}>{t("title")}</p>
        <Button
          title={t("invest")}
          color={"main"}
          arrow={false}
          path={"/songs"}
        />
      </div>

      <div className={s.listOfSongs_songList}>
        <div className={s.tableHeader}>
          <div className={s.song}>{t("header_song")}</div>
          <div className={s.tokens}>{t("header_tokens")}</div>
          <div className={s.action}></div>
        </div>
        {songs.map((song, index) => (
          <SongItem key={index} {...song} />
        ))}
      </div>
    </div>
  );
}
