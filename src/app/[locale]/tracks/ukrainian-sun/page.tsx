import cs from "../../../commonStyles.module.scss";
import s from "./page.module.scss";
import { Header } from "@/components/Header/Header";
import Faq from "@/components/Faq/Faq";
import { Footer } from "@/components/Footer/Footer";
import { Labels } from "@/components/Labels/Labels";
import { TrackDetails } from "@/components/TrackDetails/TrackDetails";
import { YoutubeVideo } from "@/app/[locale]/tracks/components/YoutubeVideo";
import { UkrainianSunDescription } from "@/app/[locale]/tracks/ukrainian-sun/UkrainianSunDescription";
import { AboutArtist } from "@/app/[locale]/tracks/ukrainian-sun/AboutArtist";
import { useTranslations } from "next-intl";

export default function UkrainianSunTrack() {
  const t = useTranslations("UkrainianSun");

  return (
    <div className={cs.main}>
      <Header />
      <div className={s.sectionWrapper}>
        <div className={s.bg}></div>
        <div className={s.trackPageSection}>
          <div className={s.info}>
            <div className={s.trackCover}>
              <p className={s.titleText}>Tony Tonite</p>
              <p className={s.trackCover_songName}>Українське Сонце</p>
            </div>
            <div className={s.trackDescription}>
              <p className={s.titleText} style={{ marginBottom: 16 }}>
                Українське Сонце
              </p>
              <Labels
                author={"Tony Tonite, Yarmak"}
                genre={t("song_genre")}
                location={t("song_location")}
              />
              <UkrainianSunDescription />
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
            <YoutubeVideo id={"hsHSJIAGUPg"} />
          </div>
          <AboutArtist />
        </div>
      </div>
      <Faq />
      <Footer />
    </div>
  );
}
