import s from "./Catalog.module.scss";
import { GreyBlock } from "@/components/ui/GreyBlock/GreyBlock";
import { Labels } from "@/components/Labels/Labels";
import { Button } from "@/components/ui/Button/Button";
import { TrackDetails } from "@/components/TrackDetails/TrackDetails";
import { dealerEN, dealerUK } from "@/data/tracksData";
import { useTranslations } from "next-intl";
import Image from "next/image";

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

  return (
    <div className={s.catalog}>
      <GreyBlock borderRadius={12}>
        <div className={s.trackCard}>
          <div className={s.trackCard_img}>
            <Image
              src={"/albums/dealer.jpg"}
              alt={"track cover"}
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={s.trackCard_description}>
            <p className={s.trackCard_title}>{t("song_title")}</p>
            <Labels genre={t("song_genre")} location={t("song_location")} />
            <TrackDetails dataEN={dealerEN} dataUK={dealerUK} />
            <Button
              title={t("song_button")}
              color={"main"}
              arrow={true}
              path={"/tracks/dealer"}
            />
          </div>
        </div>
      </GreyBlock>
      <LockedSong imgSrc={"/albums/album4.png"} />
      <LockedSong imgSrc={"/albums/album3.png"} />
      <LockedSong imgSrc={"/albums/album1.png"} />
      <LockedSong imgSrc={"/albums/album2.png"} />
    </div>
  );
}
