"use client";

import { ArrowIcon } from "@/app/[locale]/(public)/_gallery/ArrowIcon";
import Fancybox from "@/app/[locale]/(public)/_gallery/Fancybox";
import s from "@/app/[locale]/(public)/gallery/Gallery.module.scss";
import { galleryData } from "@/data/galleryData";
import * as React from "react";

export function EventGallery(props: {
  eventNumber: number;
  setEvent: React.Dispatch<React.SetStateAction<number | null>>;
  backButtonText: string;
}) {
  const event = galleryData[props.eventNumber];

  function BackToAllEventLink() {
    return (
      <div
        className={s.backToAllEvent}
        onClick={() => {
          props.setEvent(null);
        }}
      >
        <ArrowIcon />
        <p>{props.backButtonText}</p>
      </div>
    );
  }

  return (
    <Fancybox
      options={{
        Carousel: {
          infinite: false,
        },
      }}
    >
      <BackToAllEventLink />
      {event.thumbnails.map((_, i) => {
        return (
          <a key={i.toString()} data-fancybox="gallery" href={event.images[i]}>
            <img alt={"image" + i} src={event.thumbnails[i]} />
          </a>
        );
      })}
    </Fancybox>
  );
}
