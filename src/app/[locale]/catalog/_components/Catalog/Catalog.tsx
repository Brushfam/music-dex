import s from "./Catalog.module.scss";
import { GreyBlock } from "@/components/ui/GreyBlock/GreyBlock";
import { Labels } from "@/components/Labels/Labels";
import { Button } from "@/components/ui/Button/Button";
import { TrackDetails } from "@/components/TrackDetails/TrackDetails";
import { dealerEN, dealerUK } from "@/data/tracksData";
import { useTranslations } from "next-intl";

export function Catalog() {
  const t = useTranslations("Catalog");

  function LockedSong(props: { imgSrc: string }) {
    return (
      <GreyBlock borderRadius={12}>
        <div className={s.trackCard}>
          <div
            style={{
              height: 210,
              position: "relative",
              overflow: "hidden",
              borderRadius: 6,
            }}
          >
            <div className={s.blurLayout}></div>
            <img
              src={props.imgSrc}
              alt={"track cover"}
              className={s.trackCard_cover}
              style={{objectFit: "contain"}}
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
          <div style={{ height: 210, overflow: "hidden", borderRadius: 6 }}>
            <img
              src={"/albums/dealer.jpg"}
              alt={"track cover"}
              className={s.trackCard_cover}
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
      <LockedSong imgSrc={"/albums/album4-blurred.jpg"} />
      <LockedSong imgSrc={"/albums/album3-blurred.jpg"} />
      <LockedSong imgSrc={"/albums/album1-blurred.jpg"} />
      <LockedSong imgSrc={"/albums/album2-blurred.jpg"} />
    </div>
  );
}
