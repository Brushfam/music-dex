"use client"
import { useLocale } from "use-intl";
import { trackDataEN, trackDataUK } from "@/data/trackData";
import s from "@/app/[locale]/tracks/ukrainian-sun/page.module.scss";
import { Tab } from "@/components/ui/Tab/Tab";
import { ColumnContainer } from "@/components/ui/Containers/Containers";

export function AboutArtist() {
  const currentLocale = useLocale();
  const trackData = currentLocale === "uk" ? trackDataUK : trackDataEN;

  return (
    <ColumnContainer>
      <Tab text={currentLocale == "uk" ? "Про автора" : "About artist"} />
      <div className={s.aboutArtist}>
        {trackData.about_artist.map((paragraph, index) => {
          return <p key={index.toString()}>{paragraph}</p>;
        })}
      </div>
    </ColumnContainer>
  );
}
