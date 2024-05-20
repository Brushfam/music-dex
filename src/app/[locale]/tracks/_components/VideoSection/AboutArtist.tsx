"use client";
import { useLocale } from "use-intl";
import { dealerEN, dealerUK } from "@/data/tracksData";
import s from "@/app/[locale]/tracks/_components/VideoSection/VideoSection.module.scss";
import { ColumnContainer } from "@/components/ui/Containers/Containers";

export function AboutArtist() {
  const currentLocale = useLocale();
  const trackData = currentLocale === "uk" ? dealerUK : dealerEN;

  return (
    <ColumnContainer>
      <div className={s.tab}>
        {currentLocale == "uk" ? "Про автора" : "About artist"}
      </div>
      <div className={s.aboutArtist}>
        {trackData.about_artist.map((paragraph, index) => {
          return <p key={index.toString()}>{paragraph}</p>;
        })}
      </div>
    </ColumnContainer>
  );
}
