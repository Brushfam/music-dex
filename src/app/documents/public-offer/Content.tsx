"use client";
import s from "../documents.module.css";
import { UseDocs } from "@/context/DocsContext";
import {
  point0EN,
  point0UA,
  pointsEN,
  pointsUA,
} from "@/data/documents/public-offer/publicOfferContent";

export default function Content() {
  const docsContext = UseDocs();
  let generalInformationData = docsContext.lang === "UA" ? point0UA : point0EN;
  let pointsData = docsContext.lang === "UA" ? pointsUA : pointsEN;

  return (
    <div className={s.contentWrapper}>
      <div className={s.point}>
        {generalInformationData.map((item, i) => {
          return (
            <div key={i.toString()} className={s.pointText}>
              {item.text}
            </div>
          );
        })}
      </div>
      {pointsData.map((item, itemNumber) => {
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
