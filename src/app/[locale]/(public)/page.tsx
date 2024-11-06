import { FlowList } from "@/app/[locale]/(public)/_components/FlowList/FlowList";
import { Partners } from "@/app/[locale]/(public)/_components/Partners/Partners";
import { TeamList } from "@/app/[locale]/(public)/_components/TeamList/TeamList";
import { Terms } from "@/app/[locale]/(public)/_components/Terms/Terms";
import { TracksSectionAlbums } from "@/app/[locale]/(public)/_components/Tracks/Tracks";
import FaqSection from "@/components/Faq/FaqSection/FaqSection";
import { ArtistModal } from "@/components/modals/ArtistModal/ArtistModal";
import { Button } from "@/components/ui/Button/Button";
import { ColumnContainer } from "@/components/ui/Containers/Containers";
import { Section } from "@/components/ui/Section/Section";
import { flowListDataEN, flowListDataUK } from "@/data/homepage/flowListData";
import {
  startBuildFlowListDataEN,
  startBuildFlowListDataUK,
} from "@/data/homepage/startBuildFlowList";
import { useTranslations } from "next-intl";
import cs from "../../commonStyles.module.scss";
import { ForArtistSection } from "./_components/ForArtistSection/ForArtistSection";
import { StartBuildFlowList } from "./_components/StartBuildFlowList/StartBuildFlowList";
import s from "./page.module.scss";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <main className={cs.main}>
      <ArtistModal />

      {/*  Banner */}
      <div className={cs.bannerWrapper}>
        <div className={s.videoBackground}>
          <video autoPlay muted loop>
            <source src="/backgrounds/main-background.webm" type="video/webm" />
          </video>
        </div>
        <Section banner={true}>
          <div className={s.bannerContainer}>
            <div className={s.bannerTexts}>
              <h2>{t("banner_header")}</h2>
              <Button
                title={t("learn_more_button")}
                color={"main"}
                arrow={false}
                path={"#home-how-it-works"}
              />
            </div>
          </div>
        </Section>
        <div className={s.shadowBottom} />
      </div>

      {/*  Tracks */}
      <Section>
        <div className={s.tracksContainer}>
          <div className={s.tracksContainer_title}>
            <h3>{t("tracks_header")}</h3>
            <p className={s.tracksContainer_description}>
              {t("tracks_description")}
            </p>
            <Button
              title={t("tracks_button")}
              color={"transparent"}
              arrow={true}
              path={"/songs"}
            />
          </div>
          <TracksSectionAlbums />
        </div>
      </Section>

      {/*  How it works */}
      <div className={s.howItWorksWrapper} id={"home-how-it-works"}>
        <div className={s.howItWorksBg} />
        <Section>
          <div className={`${s.flowContainer} ${s.howItWorksContainer}`}>
            <ColumnContainer>
              <h3>{t("how_it_works_header")}</h3>
              <p className={s.flowContainer_title}>{t("how_it_works")}</p>
            </ColumnContainer>
            <FlowList
              dataEN={flowListDataEN}
              dataUK={flowListDataUK}
              symbol={"0"}
            />
          </div>
        </Section>
      </div>

      {/*  Our terms */}
      <div className={s.gradientWrapper}>
        <Section>
          <ColumnContainer centered={true}>
            <h3>{t("terms_header")}</h3>
            <h5>{t("terms_description")}</h5>
          </ColumnContainer>
          <Terms />
        </Section>
      </div>
      {/* Start building */}
      <div className={s.startBuildingWrapper} id={"home-start-building"}>
        <Section>
          <ColumnContainer centered={true}>
            <h3>{t("start_building_header_1")}</h3>
            <h4 className={s.orange}>{t("start_building_header_2")}</h4>
            <h3 style={{ marginBottom: "50px" }}>
              {t("start_building_header_3")}
            </h3>
          </ColumnContainer>
          <div className={`${s.flowContainer} ${s.startBuildingContainer}`}>
            <div className={s.startBuildingImages}>
              <img src="/start-building/img-1.jpg" alt="" />
              <div className={s.startBuildingImage2}>
                <img src="/start-building/img-2.jpg" alt="" />
              </div>
            </div>
            <StartBuildFlowList
              dataEN={startBuildFlowListDataEN}
              dataUK={startBuildFlowListDataUK}
              symbol={"0"}
            />
          </div>
        </Section>
      </div>
      {/* Starknet */}
      <ForArtistSection />
      {/* Partners */}
      <div className={s.lightThemeWrapper} id={"home-how-it-works"}>
        <Partners />
      </div>
      {/* Roadmap */}
      {/* <Section>
        <ColumnContainer centered={true}>
          <h3>{t("roadmap_header")}</h3>
          <h5>{t("roadmap_description")}</h5>
          <Roadmap />
        </ColumnContainer>
      </Section> */}
      {/* Team */}
      <Section>
        <div className={s.teamContainer}>
          <h3 style={{ maxWidth: 510 }}>{t("team_header")}</h3>
          <TeamList />
        </div>
      </Section>
      <FaqSection />
    </main>
  );
}
