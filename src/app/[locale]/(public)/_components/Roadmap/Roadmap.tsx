"use client";
import s from "./Roadmap.module.scss";
import { FlowList } from "@/app/[locale]/(public)/_components/FlowList/FlowList";
import { roadmapDataEN, roadmapDataUA } from "@/data/homepage/roadmapData";
import { useLocale } from "use-intl";

export function Roadmap() {
  const locale = useLocale();
  return (
    <div className={s.roadmap}>
      <img
        src={locale === "uk" ? "/roadmap-uk.svg" : "/roadmap-en.svg"}
        alt={"roadmap"}
      />
      <div className={s.mobileRoadmap}>
        <FlowList dataEN={roadmapDataEN} dataUK={roadmapDataUA} symbol={"Q"} />
      </div>
    </div>
  );
}
