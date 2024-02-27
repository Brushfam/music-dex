import s from "../documents.module.css";
import { point0, points } from "@/data/documents/privacy-policy/privacyPolicyContent";

export default function Content() {
  return (
    <div className={s.contentWrapper}>
      <div className={s.point}>
        {point0 &&
          point0.map((item, i) => {
            return (
              <div key={i.toString()} className={s.pointText}>
                {item.text}
              </div>
            );
          })}
      </div>
      {points &&
        points.map((item, itemNumber) => {
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
