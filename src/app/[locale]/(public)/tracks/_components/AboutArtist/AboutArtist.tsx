"use client";
import { useLocale } from "use-intl";
import { dodomyEN, dodomyUK } from "@/data/tracksData";
import s from "./AboutArtist.module.scss"
import { ColumnContainer } from "@/components/ui/Containers/Containers";

export function AboutArtist() {
  const currentLocale = useLocale();
  const trackData = currentLocale === "uk" ? dodomyUK : dodomyEN;

  return (
    <ColumnContainer>
      <div className={s.aboutArtist}>
        {trackData.about_artist.map((paragraph, index) => {
          return <p key={index.toString()}>{paragraph}</p>;
        })}
      </div>
    </ColumnContainer>
  );
}
