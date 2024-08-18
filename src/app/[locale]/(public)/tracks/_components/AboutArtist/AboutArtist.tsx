"use client";

import { ColumnContainer } from "@/components/ui/Containers/Containers";
import { trackDataType } from "@/types/types";
import { useLocale } from "use-intl";
import s from "./AboutArtist.module.scss";

export function AboutArtist(props: {
  dataEN: trackDataType;
  dataUK: trackDataType;
}) {
  const currentLocale = useLocale();
  const trackData = currentLocale === "uk" ? props.dataUK : props.dataEN;

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
