import s from "./page.module.scss";
import cs from "./commonStyles.module.scss";
import { Section } from "@/components/ui/Section/Section";
import { ColumnContainer } from "@/components/ui/Containers/Containers";
import { Button } from "@/components/ui/Button/Button";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { FlowList } from "@/components/homepage/FlowList/FlowList";
import { Terms } from "@/components/homepage/Terms/Terms";
import { Roadmap } from "@/components/homepage/Roadmap/Roadmap";
import { TeamList } from "@/components/homepage/TeamList/TeamList";
import {
  BannerTracks,
  TracksSectionAlbums,
} from "@/components/homepage/Tracks/Tracks";
import { flowListData } from "@/data/homepage/flowListData";
import Faq from "@/components/Faq/Faq";

export default function Home() {
  return (
    <main className={cs.main}>
      <Header />
      {/*  Banner */}
      <Section banner={true} id={"home-banner"}>
        <div className={s.bannerContainer}>
          <div className={s.shadowTop} />
          <ColumnContainer>
            <h2>Welcome to MusicDex</h2>
            <p className={s.bannerContainer_p}>
              Invest in Music Royalties and Shape the Future of Music
            </p>
            <Button
              title={"Learn more"}
              color={"red"}
              path={"#home-how-it-works"}
            />
          </ColumnContainer>
          <BannerTracks />
          <div className={s.shadowBottom} />
        </div>
      </Section>
      {/*  How it works */}
      <div className={s.lightThemeWrapper}>
        <Section id={"home-how-it-works"}>
          <div className={s.howItWorksContainer}>
            <ColumnContainer>
              <h3>MusicDex revolutionizes music investment</h3>
              <p style={{ width: "100%" }}>Here&#39;s how it work:</p>
            </ColumnContainer>
            <FlowList listData={flowListData} symbol={"0"} />
          </div>
        </Section>
      </div>
      {/*  Our terms */}
      <div className={s.gradientWrapper}>
        <Section id={"home-terms"}>
          <ColumnContainer centered={true}>
            <h3>Invest with confidence</h3>
            <h5>Our terms include:</h5>
          </ColumnContainer>
          <Terms />
        </Section>
      </div>
      {/*  Tracks */}
      <Section id={"home-tracks"}>
        <div className={s.tracksContainer}>
          <div className={s.tracksContainer_title}>
            <h3>Tracks Available for Investment</h3>
            <p className={s.tracksContainer_description}>
              Explore our curated selection of tracks ready for investment. Each
              track represents a unique investment opportunity with potential
              for passive income.
            </p>
            <Button
              title={"Explore all tracks"}
              color={"transparent"}
              path={"/catalog"}
            />
          </div>
          <TracksSectionAlbums />
        </div>
      </Section>
      {/* Roadmap */}
      <Section id={"home-roadmap"}>
        <ColumnContainer centered={true}>
          <h3>Roadmap</h3>
          <h5>Join us on our journey:</h5>
          <Roadmap />
        </ColumnContainer>
      </Section>
      {/* Team */}
      <Section id={"home-team"}>
        <div className={s.teamContainer}>
          <h3 style={{ maxWidth: 510 }}>Meet the faces behind MusicDex</h3>
          <TeamList />
        </div>
      </Section>
      <Faq />
      <Footer />
    </main>
  );
}
