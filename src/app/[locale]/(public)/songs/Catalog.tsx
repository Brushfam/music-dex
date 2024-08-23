import { Labels } from "@/components/Labels/Labels";
import { TrackDetails } from "@/components/TrackDetails/TrackDetails";
import { Button } from "@/components/ui/Button/Button";
import { GreyBlock } from "@/components/ui/GreyBlock/GreyBlock";
import { useTranslations } from "next-intl";
import Image from "next/image";
import s from "./page.module.scss";

type SongInfo = {
  song_name: string;
  cover: string;
  cover_to_top: boolean;
  genre: string;
  country: string;
  slug: string;
  rightsholder: string;
  release_date: string;
  listening_date: string;
  total_supply: number;
  price: number;
};

function LockedSong(props: { imgSrc: string }) {
  const t = useTranslations("Catalog");
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

export function Catalog(props: { catalog: SongInfo[] | null }) {
  const t = useTranslations("Catalog");

  function AvailableSong(props: { song: SongInfo }) {
    return (
      <GreyBlock borderRadius={12}>
        <div className={s.trackCard}>
          <div className={s.trackCard_img}>
            <Image
              src={props.song.cover}
              alt={"track cover"}
              fill={true}
              style={props.song.cover_to_top ? { objectPosition: "top" } : {}}
            />
          </div>
          <div className={s.trackCard_description}>
            <p className={s.trackCard_title}>{props.song.song_name}</p>
            <Labels genre={props.song.genre} location={t("song_location")} />
            <TrackDetails
              rightsholder={props.song.rightsholder}
              listeningDate={props.song.listening_date}
              releaseDate={props.song.release_date}
              totalSupply={props.song.total_supply}
              price={props.song.price}
            />
            <Button
              title={t("song_button")}
              color={"main"}
              arrow={true}
              path={"songs/" + props.song.slug}
            />
          </div>
        </div>
      </GreyBlock>
    );
  }

  return (
    <div className={s.catalog}>
      {props.catalog &&
        props.catalog.map((song, index) => {
          return <AvailableSong key={index.toString()} song={song} />;
        })}
      <LockedSong imgSrc={"/albums/album3.png"} />
      <LockedSong imgSrc={"/albums/album1.png"} />
      <LockedSong imgSrc={"/albums/album2.png"} />
    </div>
  );
}
