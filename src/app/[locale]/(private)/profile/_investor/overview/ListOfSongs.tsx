import { ISongData } from "@/types/types";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/uk";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useState } from "react";
import s from "./Overview.module.scss";

function SongItem({
  name,
  artist,
  tokens,
  last_purchase,
  invested,
  date,
}: ISongData) {
  const t = useTranslations("ProfileInvestor.Overview.ListOfSongs");
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  dayjs.locale(locale);

  return (
    <div className={s.songItem} onClick={handleToggle}>
      <div className={s.tableRow}>
        <div className={s.song}>
          <div className={s.artist}>{artist}</div>
          <div className={s.title}>{name}</div>
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
            <div className={s.songDetailedRight}>
              {dayjs(date).format("MMMM DD, YYYY")}
            </div>
          </div>
          <div className={s.songDetailedRow}>
            <div className={s.songDetailedLeft}>{t("detailed.purchase")}</div>
            <div className={s.songDetailedRight}>
              {dayjs(last_purchase).format("DD.MM.YYYY")}
            </div>
          </div>
          <div className={s.songDetailedRow}>
            <div className={s.songDetailedLeft}>{t("detailed.invested")}</div>
            <div className={s.songDetailedRight}>${invested}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ListOfSongs({ songs }: { songs: ISongData[] }) {
  const t = useTranslations("ProfileInvestor.Overview.ListOfSongs");

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
