import s from "../documents.module.css";
import { point0EN, pointsEN } from "@/data/documents/privacy-policy/privacyPolicyContent";

export default function Content() {
  return (
    <div className={s.contentWrapper}>
      <div className={s.point}>
        {point0EN &&
            point0EN.map((item, i) => {
            return (
              <div key={i.toString()} className={s.pointText}>
                {item.text}
              </div>
            );
          })}
      </div>
      {pointsEN &&
          pointsEN.map((item, itemNumber) => {
          return (
            <div
              key={itemNumber.toString()}
              className={s.point}
              id={"point" + (itemNumber + 1).toString()}
            >
              <div className={s.pointTitle}>{item.title}</div>
              {item.point &&
                item.point.map((paragraph, textNumber) => {
                  return (
                    <div key={textNumber.toString()} className={s.pointText}>
                      {paragraph.text}
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}
