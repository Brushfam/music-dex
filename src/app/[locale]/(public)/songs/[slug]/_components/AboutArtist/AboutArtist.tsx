"use client";

import { ColumnContainer } from "@/components/ui/Containers/Containers";
import { getSongAboutArtist } from "@/services/songs";
import { useEffect, useState } from "react";
import { useLocale } from "use-intl";
import s from "./AboutArtist.module.scss";

type Paragraphs = {
  en: string[];
  uk: string[];
};

export function AboutArtist(props: { slug: string }) {
  const currentLocale = useLocale();
  const [paragraphs, setParagraphs] = useState<Paragraphs>({ en: [], uk: [] });
  const currentParagraph =
    currentLocale === "en" ? paragraphs.en : paragraphs.uk;

  useEffect(() => {
    getSongAboutArtist(props.slug)
      .then((res) => {
        setParagraphs({ en: res.data.aboutEN, uk: res.data.aboutUK });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.slug]);

  return (
    <ColumnContainer>
      <div className={s.aboutArtist}>
        {currentParagraph.map((paragraph, index) => {
          return <p key={index.toString()}>{paragraph}</p>;
        })}
      </div>
    </ColumnContainer>
  );
}
