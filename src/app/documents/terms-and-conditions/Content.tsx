"use client"
import s from "../documents.module.css";
import {
  generalInformationUA,
  generalInformationEN,
  pointsUA,
  pointsEN,
} from "@/data/documents/terms-and-conditions/termsContent";
import { UseDocs } from "@/context/DocsContext";

export default function Content() {
  const docsContext = UseDocs();
  let generalInformationData =
    docsContext.lang === "UA" ? generalInformationUA : generalInformationEN;
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
