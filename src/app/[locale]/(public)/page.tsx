import { FlowList } from "@/app/[locale]/(public)/_components/FlowList/FlowList";
import { Partners } from "@/app/[locale]/(public)/_components/Partners/Partners";
import { RecommendButton } from "@/app/[locale]/(public)/_components/RecommendButton/RecommendButton";
import { Roadmap } from "@/app/[locale]/(public)/_components/Roadmap/Roadmap";
import { StarknetSection } from "@/app/[locale]/(public)/_components/Starknet/StarknetSection";
import { TeamList } from "@/app/[locale]/(public)/_components/TeamList/TeamList";
import { Terms } from "@/app/[locale]/(public)/_components/Terms/Terms";
import {
  BannerTracks,
  TracksSectionAlbums,
} from "@/app/[locale]/(public)/_components/Tracks/Tracks";
import FaqSection from "@/components/Faq/FaqSection/FaqSection";
import { ArtistModal } from "@/components/modals/ArtistModal/ArtistModal";
import { Button } from "@/components/ui/Button/Button";
import { ColumnContainer } from "@/components/ui/Containers/Containers";
import { Section } from "@/components/ui/Section/Section";
import { flowListDataEN, flowListDataUK } from "@/data/homepage/flowListData";
import { useTranslations } from "next-intl";
import cs from "../../commonStyles.module.scss";
import s from "./page.module.scss";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <main className={cs.main}>
      <ArtistModal />
      {/*  Banner */}
      <div className={cs.bannerWrapper}>
        <div className={s.shadowTop} />
        <Section banner={true}>
          <div className={s.bannerContainer}>
            <ColumnContainer>
              <h2>{t("banner_header")}</h2>
              <p className={s.bannerContainer_p}>{t("banner_description")}</p>
              <div className={s.bannerButtonsBlock}>
                <RecommendButton />
                <Button
                  title={t("learn_more_button")}
                  color={"transparent"}
                  arrow={true}
                  path={"#home-how-it-works"}
                />
              </div>
            </ColumnContainer>
            <BannerTracks />
          </div>
        </Section>
        <div className={s.shadowBottom} />
      </div>
      {/*  How it works */}
      <div className={s.lightThemeWrapper} id={"home-how-it-works"}>
        <Section>
          <div className={s.flowContainer}>
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
      {/* Starknet */}
      <StarknetSection />
      {/* Partners */}
      <div className={s.lightThemeWrapper} id={"home-how-it-works"}>
        <Partners />
      </div>
      {/* Roadmap */}
      <Section>
        <ColumnContainer centered={true}>
          <h3>{t("roadmap_header")}</h3>
          <h5>{t("roadmap_description")}</h5>
          <Roadmap />
        </ColumnContainer>
      </Section>
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
