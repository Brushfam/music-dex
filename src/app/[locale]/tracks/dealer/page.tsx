import cs from "../../../commonStyles.module.scss";
import s from "./page.module.scss";
import { Header } from "@/components/Header/Header";
import Faq from "@/components/Faq/Faq";
import { Footer } from "@/components/Footer/Footer";
import { Labels } from "@/components/Labels/Labels";
import { TrackDetails } from "@/components/TrackDetails/TrackDetails";
import { YoutubeVideo } from "@/app/[locale]/tracks/_components/YoutubeVideo";
import { DealerDescription } from "@/app/[locale]/tracks/dealer/DealerDescription";
import { AboutArtist } from "@/app/[locale]/tracks/dealer/AboutArtist";
import { useTranslations } from "next-intl";
import {SharesBlock} from "@/app/[locale]/tracks/_components/SharesBlock/SharesBlock";

export default function UkrainianSunTrack() {
  const t = useTranslations("Dealer");

  return (
    <div className={cs.main}>
      <Header />
      <div className={s.sectionWrapper}>
        <div className={s.bg}></div>
        <div className={s.trackPageSection}>
          <div className={s.info}>
            <div className={s.trackCover}>
              <p className={s.titleText}>Tony Tonite</p>
              <p className={s.trackCover_songName}>Дилер</p>
            </div>
            <div className={s.trackDescription}>
              <p className={s.titleText} style={{ marginBottom: 16 }}>
                Дилер
              </p>
              <Labels
                author={"Tony Tonite"}
                genre={t("song_genre")}
                location={t("song_location")}
              />
              <DealerDescription />
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
              <TrackDetails />
            </div>
              <SharesBlock/>
          </div>
        </div>
      </div>
      <div className={s.sectionWrapper}>
        <div className={s.videoSectionContainer}>
          <div className={s.videoContainer}>
            <p
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "white",
              }}
            >
              {t("watch_video")}
            </p>
            <YoutubeVideo id={"Jb5qdg30jSU"} />
          </div>
          <AboutArtist />
        </div>
      </div>
      <Faq />
      <Footer />
    </div>
  );
}
