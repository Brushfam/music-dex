import s from "./Catalog.module.scss";
import { GreyBlock } from "@/components/ui/GreyBlock/GreyBlock";
import { Labels } from "@/components/Labels/Labels";
import { Button } from "@/components/ui/Button/Button";
import {TrackDetails} from "@/components/TrackDetails/TrackDetails";

export function Catalog() {
  return (
    <div className={s.catalog}>
      <div></div>
      <GreyBlock borderRadius={12}>
        <div className={s.trackCard}>
          <img
            src={"/albums/ukrainian-sun-wide.png"}
            alt={"track cover"}
            className={s.trackCard_cover}
          />
          <div className={s.trackCard_description}>
            <p className={s.trackCard_title}>
              Tony Tonite x Yarmak - Українське Сонце
            </p>
            <Labels genre={"Rap"} location={"Ukraine"} />
            <TrackDetails/>
            <Button
              title={"View Listing"}
              color={"red"}
              path={"/tracks/ukrainian-sun"}
            />
          </div>
        </div>
      </GreyBlock>
    </div>
  );
}
