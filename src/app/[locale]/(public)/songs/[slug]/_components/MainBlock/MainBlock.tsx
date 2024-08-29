import { Donate } from "@/app/[locale]/(public)/songs/[slug]/_components/Donate/Donate";
import { SharesBlock } from "@/app/[locale]/(public)/songs/[slug]/_components/SharesBlock/SharesBlock";
import { Labels } from "@/components/Labels/Labels";
import { TrackDetails } from "@/components/TrackDetails/TrackDetails";
import { useTranslations } from "next-intl";
import s from "./MainBlock.module.scss";

type SongMainData = {
  song_id: number;
  song_name: string;
  cover: string;
  cover_to_top: boolean;
  genre: string;
  country: string;
  description_en: string;
  description_uk: string;
  rightsholder: string;
  release_date: string;
  listening_date: string;
  total_supply: number;
  price: number;
  donate_link: string;
};

// function to get current language without client methods
function isEN(headerMessage: string) {
  return headerMessage === "Choose your track";
}

export function MainBlock(props: { songData: SongMainData; slug: string }) {
  const t = useTranslations("Catalog");

  function TrackDescription() {
    return (
      <div className={s.trackDescription}>
        <p className={s.titleText} style={{ marginBottom: 16 }}>
          {props.songData.song_name}
        </p>
        <Labels genre={props.songData.genre} location={t("song_location")} />
        <p className={s.descriptionText}>
          {isEN(t("header"))
            ? props.songData.description_en
            : props.songData.description_uk}
        </p>
        <p
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "white",
            marginBottom: 8,
          }}
        >
          {t("details")}
        </p>
        <TrackDetails
          rightsholder={props.songData.rightsholder}
          listeningDate={props.songData.listening_date}
          releaseDate={props.songData.release_date}
          totalSupply={props.songData.total_supply}
          price={props.songData.price}
        />
      </div>
    );
  }

  const coverStyle = {
    backgroundImage: `url(${props.songData.cover})`,
    backgroundPosition: props.songData.cover_to_top ? "top" : "center",
  };

  return (
    <div className={s.sectionWrapper}>
      <div className={s.bg}></div>
      <div className={s.trackPageSection}>
        <div className={s.info}>
          <div style={coverStyle} className={s.trackCover}>
            <p className={s.titleText}>{props.songData.rightsholder}</p>
            <p className={s.trackCover_songName}>{props.songData.song_name}</p>
          </div>
          <TrackDescription />
          <div className={s.buyAndDonateBlock}>
            <SharesBlock
              price={props.songData.price}
              songId={props.songData.song_id}
              tokenName={props.songData.song_name}
              slug={props.slug}
            />
            <Donate
              donateLink={props.songData.donate_link}
              artist={props.songData.rightsholder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
