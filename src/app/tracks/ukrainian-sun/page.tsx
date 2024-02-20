import cs from "../../commonStyles.module.scss";
import s from "./page.module.scss";
import { Header } from "@/components/Header/Header";
import Faq from "@/components/Faq/Faq";
import { Footer } from "@/components/Footer/Footer";
import { Section } from "@/components/ui/Section/Section";
import { Labels } from "@/components/Labels/Labels";
import { trackData } from "@/data/trackData";
import { TrackDetails } from "@/components/TrackDetails/TrackDetails";
import { YoutubeVideo } from "@/app/tracks/components/YoutubeVideo";
import { ColumnContainer } from "@/components/ui/Containers/Containers";
import { Tab } from "@/components/ui/Tab/Tab";

export default function UkrainianSunTrack() {
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
                genre={"Rap"}
                location={"Ukraine"}
              />
              <p className={s.descriptionText}>{trackData.description}</p>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "white",
                  marginBottom: 8,
                }}
              >
                DETAILS
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
              WATCH OFFICIAL VIDEO
            </p>
            <YoutubeVideo id={"hsHSJIAGUPg"} />
          </div>
          <ColumnContainer>
            <Tab text={"About artist"} />
            <div className={s.aboutArtist}>
              {trackData.about_artist.map((paragraph, index) => {
                return <p key={index.toString()}>{paragraph}</p>;
              })}
            </div>
          </ColumnContainer>
        </div>
      </div>
      <Faq />
      <Footer />
    </div>
  );
}
