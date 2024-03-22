import s from "./Catalog.module.scss";
import { GreyBlock } from "@/components/ui/GreyBlock/GreyBlock";
import { Labels } from "@/components/Labels/Labels";
import { Button } from "@/components/ui/Button/Button";
import {TrackDetails} from "@/components/TrackDetails/TrackDetails";
import {useTranslations} from "next-intl";

export function Catalog() {
  const t = useTranslations("Catalog");

  return (
    <div className={s.catalog}>
      <div></div>
      <GreyBlock borderRadius={12}>
        <div className={s.trackCard}>
          <div style={{height: 210, overflow: "hidden", borderRadius: 10}}>
            <img
              src={"/albums/dealer.jpg"}
              alt={"track cover"}
              className={s.trackCard_cover}
            />
          </div>
          <div className={s.trackCard_description}>
            <p className={s.trackCard_title}>{t("song_title")}</p>
            <Labels genre={t("song_genre")} location={t("song_location")} />
            <TrackDetails />
            <Button
              title={t("song_button")}
              color={"red"}
              path={"/tracks/dealer"}
            />
          </div>
        </div>
      </GreyBlock>
    </div>
  );
}
