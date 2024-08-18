import { Labels } from "@/components/Labels/Labels";
import { TrackDetails } from "@/components/TrackDetails/TrackDetails";
import { Button } from "@/components/ui/Button/Button";
import { GreyBlock } from "@/components/ui/GreyBlock/GreyBlock";
import {
  chytEN,
  chytUK,
  dealerEN,
  dealerUK,
  maniacEN,
  maniacUK,
} from "@/data/tracksData";
import { trackDataType } from "@/types/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import s from "./Catalog.module.scss";

export function Catalog() {
  const t = useTranslations("Catalog");

  function LockedSong(props: { imgSrc: string }) {
    return (
      <GreyBlock borderRadius={12}>
        <div className={s.trackCard}>
          <div className={s.trackCard_img}>
            <div className={s.blurLayout}></div>
            <Image
              src={props.imgSrc}
              alt={"track cover"}
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className={s.trackCard_locked}>
          <p>{t("locked_title")}</p>
        </div>
      </GreyBlock>
    );
  }

  function AvailableSong(props: {
    coverPath: string;
    dataEN: trackDataType;
    dataUK: trackDataType;
    link: string;
    coverTop?: boolean;
  }) {
    return (
      <GreyBlock borderRadius={12}>
        <div className={s.trackCard}>
          <div className={s.trackCard_img}>
            <Image
              src={props.coverPath}
              alt={"track cover"}
              fill={true}
              style={props.coverTop ? { objectPosition: "top" } : {}}
            />
          </div>
          <div className={s.trackCard_description}>
            <p className={s.trackCard_title}>{props.dataEN.name}</p>
            <Labels genre={props.dataEN.genre} location={t("song_location")} />
            <TrackDetails dataEN={props.dataEN} dataUK={props.dataUK} />
            <Button
              title={t("song_button")}
              color={"main"}
              arrow={true}
              path={props.link}
            />
          </div>
        </div>
      </GreyBlock>
    );
  }

  return (
    <div className={s.catalog}>
      <AvailableSong
        coverPath={"/albums/chyt.jpg"}
        dataEN={chytEN}
        dataUK={chytUK}
        link={"/tracks/chyt"}
        coverTop={true}
      />
      <AvailableSong
        coverPath={"/albums/maniac.jpg"}
        dataEN={maniacEN}
        dataUK={maniacUK}
        link={"/tracks/maniac"}
      />
      <AvailableSong
        coverPath={"/albums/dealer.jpg"}
        dataEN={dealerEN}
        dataUK={dealerUK}
        link={"/tracks/dealer"}
      />
      <LockedSong imgSrc={"/albums/album3.png"} />
      <LockedSong imgSrc={"/albums/album1.png"} />
      <LockedSong imgSrc={"/albums/album2.png"} />
    </div>
  );
}
