import s from "./Catalog.module.scss";
import { GreyBlock } from "@/components/ui/GreyBlock/GreyBlock";
import { Labels } from "@/components/Labels/Labels";
import { Button } from "@/components/ui/Button/Button";
import { TrackDetails } from "@/components/TrackDetails/TrackDetails";
import {
  myKyivDataEN, myKyivDataUK,
  og044DataEN, og044DataUK,
  dealerEN,
  dealerUK,
} from "@/data/tracksData";
import {useTranslations} from "next-intl";

export function Catalog() {
  const t = useTranslations("Catalog");

  return (
    <div className={s.catalog}>
      <GreyBlock borderRadius={12}>
        <div className={s.trackCard}>
          <div style={{ height: 210, overflow: "hidden", borderRadius: 6 }}>
            <img
              src={"/albums/dealer.jpg"}
              alt={"track cover"}
              className={s.trackCard_cover}
            />
          </div>
          <div className={s.trackCard_description}>
            <p className={s.trackCard_title}>{t("song_title")}</p>
            <Labels genre={t("song_genre")} location={t("song_location")} />
            <TrackDetails dataEN={dealerEN} dataUK={dealerUK} />
            <Button
              title={t("song_button")}
              color={"main"}
              arrow={true}
              path={"/tracks/dealer"}
            />
          </div>
        </div>
      </GreyBlock>

      {/* DEMO */}
      <GreyBlock borderRadius={12}>
        <div className={s.trackCard}>
          <img
            src={"/albums/ukrainian-sun-wide.png"}
            alt={"track cover"}
            className={s.trackCard_cover}
          />
          <div className={s.trackCard_description}>
            <p className={s.trackCard_title}>Tony Tonite - Києве мій</p>
            <Labels genre={t("song_genre")} location={t("song_location")} />
            <TrackDetails dataEN={myKyivDataEN} dataUK={myKyivDataUK} />
            <Button
              title={t("song_button")}
              color={"main"}
              arrow={true}
              path={"/tracks/demo/my-kyiv"}
            />
          </div>
        </div>
      </GreyBlock>
      <GreyBlock borderRadius={12}>
        <div className={s.trackCard}>
          <img
            src={"/albums/ukrainian-sun-wide.png"}
            alt={"track cover"}
            className={s.trackCard_cover}
          />
          <div className={s.trackCard_description}>
            <p className={s.trackCard_title}>Tony Tonite - OG 044</p>
            <Labels genre={t("song_genre")} location={t("song_location")} />
            <TrackDetails dataEN={og044DataEN} dataUK={og044DataUK} />
            <Button
              title={t("song_button")}
              color={"main"}
              arrow={true}
              path={"/tracks/demo/og044"}
            />
          </div>
        </div>
      </GreyBlock>
    </div>
  );
}
