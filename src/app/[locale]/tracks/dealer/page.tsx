import s from "./page.module.scss";
import {tokensAddresses, dealerEN, dealerUK} from "@/data/tracksData";
import { YoutubeVideo } from "@/app/[locale]/tracks/_components/YoutubeVideo";
import { PageTemplate } from "@/app/[locale]/tracks/_components/PageTemplate/PageTemplate";
import { useTranslations } from "next-intl";
import { AboutArtist } from "@/app/[locale]/tracks/dealer/AboutArtist";

export default function DealerTrack() {
  const t = useTranslations("Dealer");

  return (
    <PageTemplate
      artist={"Tony Tonite"}
      songName={"Дилер"}
      tokenAddress={tokensAddresses.ukrainianSun}
      trackDataEN={dealerEN}
      trackDataUK={dealerUK}
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
            <YoutubeVideo id={"Jb5qdg30jSU"} />
          </div>
          <AboutArtist />
        </div>
      </div>
    </PageTemplate>
  );
}
