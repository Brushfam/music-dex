"use client";

import { useLocale } from "use-intl";
import s from "../../documents.module.css";

type PointType = {
  title: JSX.Element;
  point: { text: JSX.Element }[];
};

export default function Content(props: {
  introductionEN: { text: JSX.Element }[];
  introductionUA: { text: JSX.Element }[];
  pointsEN: PointType[];
  pointsUA: PointType[];
}) {
  const currentLocale = useLocale();
  let introduction =
    currentLocale === "uk" ? props.introductionUA : props.introductionEN;
  let points = currentLocale === "uk" ? props.pointsUA : props.pointsEN;

  return (
    <div className={s.contentWrapper}>
      <div className={s.point}>
        {introduction.map((item, i) => {
          return (
            <div key={i.toString()} className={s.pointText}>
              {item.text}
            </div>
          );
        })}
      </div>
      {points.map((item, itemNumber) => {
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
