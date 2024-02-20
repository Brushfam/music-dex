import s from "./TrackDetails.module.scss";
import { trackData } from "@/data/trackData";

export function TrackDetails() {
  return (
    <div className={s.trackDetails}>
      <div className={s.trackDetails_topRow}>
        <p>{trackData.rights_holder}</p>
        <p>{trackData.name}</p>
      </div>
      {trackData.details.map((data, index) => {
        return (
          <div className={s.trackDetails_standartRow} key={index.toString()}>
            <p>{data.type}</p>
            <p>{data.value}</p>
          </div>
        );
      })}
    </div>
  );
}
