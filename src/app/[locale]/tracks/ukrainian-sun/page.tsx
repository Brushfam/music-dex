import s from "./page.module.scss";
import { tokensAddresses, ukrainianSunDataEN } from "@/data/tracksData";
import { YoutubeVideo } from "@/app/[locale]/tracks/_components/YoutubeVideo";
import { PageTemplate } from "@/app/[locale]/tracks/_components/PageTemplate/PageTemplate";
import { useTranslations } from "next-intl";
import { AboutArtist } from "@/app/[locale]/tracks/ukrainian-sun/AboutArtist";

export default function UkrainianSunTrack() {
  const t = useTranslations("UkrainianSun");

  return (
    <PageTemplate
      artist={"Tony Tonite"}
      songName={"Українське Сонце"}
      tokenAddress={tokensAddresses.ukrainianSun}
      trackData={ukrainianSunDataEN}
    >
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
    </PageTemplate>
  );
}
