import s from "./page.module.scss";
import cs from "../commonStyles.module.scss";
import { Section } from "@/components/ui/Section/Section";
import { ColumnContainer } from "@/components/ui/Containers/Containers";
import { Button } from "@/components/ui/Button/Button";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { FlowList } from "@/app/[locale]/_components/FlowList/FlowList";
import { Terms } from "@/app/[locale]/_components/Terms/Terms";
import { Roadmap } from "@/app/[locale]/_components/Roadmap/Roadmap";
import { TeamList } from "@/app/[locale]/_components/TeamList/TeamList";
import {
  BannerTracks,
  TracksSectionAlbums,
} from "@/app/[locale]/_components/Tracks/Tracks";
import Faq from "@/components/Faq/Faq";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <main className={cs.main}>
      <Header />
      {/*  Banner */}
      <Section banner={true} id={"home-banner"}>
        <div className={s.bannerContainer}>
          <div className={s.shadowTop} />
          <ColumnContainer>
            <h2>{t("banner_header")}</h2>
            <p className={s.bannerContainer_p}>{t("banner_description")}</p>
            <Button
              title={t("learn_more_button")}
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
              <h3>{t("how_it_works_header")}</h3>
              <p style={{ width: "100%" }}>{t("how_it_works")}</p>
            </ColumnContainer>
            <FlowList />
          </div>
        </Section>
      </div>
      {/*  Our terms */}
      <div className={s.gradientWrapper}>
        <Section id={"home-terms"}>
          <ColumnContainer centered={true}>
            <h3>{t("terms_header")}</h3>
            <h5>{t("terms_description")}</h5>
          </ColumnContainer>
          <Terms />
        </Section>
      </div>
      {/*  Tracks */}
      <Section id={"home-tracks"}>
        <div className={s.tracksContainer}>
          <div className={s.tracksContainer_title}>
            <h3>{t("tracks_header")}</h3>
            <p className={s.tracksContainer_description}>
              {t("tracks_description")}
            </p>
            <Button
              title={t("tracks_button")}
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
          <h3>{t("roadmap_header")}</h3>
          <h5>{t("roadmap_description")}</h5>
          <Roadmap />
        </ColumnContainer>
      </Section>
      {/* Team */}
      <Section id={"home-team"}>
        <div className={s.teamContainer}>
          <h3 style={{ maxWidth: 510 }}>{t("team_header")}</h3>
          <TeamList />
        </div>
      </Section>
      <Faq />
      <Footer />
    </main>
  );
}
