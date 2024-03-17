import s from "./Catalog.module.scss";
import { GreyBlock } from "@/components/ui/GreyBlock/GreyBlock";
import { Labels } from "@/components/Labels/Labels";
import { Button } from "@/components/ui/Button/Button";
import { TrackDetails } from "@/components/TrackDetails/TrackDetails";
import {
  myKyivData,
  og044Data,
  ukrainianSunDataEN,
  ukrainianSunDataUK,
} from "@/data/tracksData";

export function Catalog() {
  return (
    <div className={s.catalog}>
      <GreyBlock borderRadius={12}>
        <div className={s.trackCard}>
          <img
            src={"/albums/ukrainian-sun-wide.png"}
            alt={"track cover"}
            className={s.trackCard_cover}
          />
          <div className={s.trackCard_description}>
            <p className={s.trackCard_title}>Tony Tonite - Українське Сонце</p>
            <Labels genre={"Rap"} location={"Ukraine"} />
            <TrackDetails
              dataEN={ukrainianSunDataEN}
              dataUK={ukrainianSunDataUK}
            />
            <Button
              title={"View Listing"}
              color={"main"}
              arrow={true}
              path={"/tracks/ukrainian-sun"}
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
            <Labels genre={"Rap"} location={"Ukraine"} />
            <TrackDetails dataEN={myKyivData} dataUK={myKyivData} />
            <Button
              title={"View Listing"}
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
            <Labels genre={"Rap"} location={"Ukraine"} />
            <TrackDetails dataEN={og044Data} dataUK={og044Data} />
            <Button
              title={"View Listing"}
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
