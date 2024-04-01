import s from "./Tracks.module.scss";
import {
  TrackCard1,
  TrackCard2,
  TrackCard3,
  TrackCard4,
} from "@/app/[locale]/_components/TrackCard/TrackCard";

export function BannerTracks() {
  return (
    <div className={s.banner_tracksWrapper}>
      <div className={s.banner_trackColumn} style={{ marginTop: 90 }}>
        <TrackCard2 />
        <TrackCard4 />
        <TrackCard3 />
        <TrackCard2 />
        <TrackCard4 />
      </div>
      <div className={s.banner_trackColumn} style={{ marginBottom: 20 }}>
        <TrackCard4 />
        <TrackCard3 />
        <TrackCard1 />
        <TrackCard4 />
        <TrackCard4 />
      </div>
    </div>
  );
}

export function TracksSectionAlbums() {
  return (
    <div className={s.tracksSection}>
      <TrackCard1 />
      <TrackCard2 />
      <div className={s.tracksSection_tablet}>
        <TrackCard4 />
      </div>
      <div className={s.tracksSection_desktop}>
        <TrackCard2 />
      </div>

      <TrackCard3 />
      <TrackCard4 />
      <div className={s.tracksSection_tablet}>
        <TrackCard1 />
      </div>
      <div className={s.tracksSection_desktop}>
        <TrackCard3 />
      </div>
    </div>
  );
}
