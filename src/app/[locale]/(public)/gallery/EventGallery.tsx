"use client";

import Fancybox from "@/app/[locale]/(public)/gallery/Fancybox";
import * as React from "react";
import { galleryData } from "@/data/galleryData";
import s from "@/app/[locale]/(public)/gallery/Gallery.module.scss";

export function EventGallery(props: {
  eventNumber: number;
  setEvent: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const event = galleryData[props.eventNumber];
  const numbersArray = Array.from(Array(event.imageNumber).keys()).map(
    (i) => i + 1,
  );

  function BackToAllEventLink() {
    return (
      <p
        className={s.backToAllEvent}
        onClick={() => {
          props.setEvent(null);
        }}
      >
        Back to all events
      </p>
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
      {numbersArray.map((i) => {
        return (
          <a
            key={i.toString()}
            data-fancybox="gallery"
            href={"/gallery/" + event.folder + "/img" + i + ".jpg"}
          >
            <img
              alt={"image" + i}
              src={"/gallery/" + event.folder + "/thumbnails/tmb" + i + ".jpeg"}
            />
          </a>
        );
      })}
    </Fancybox>
  );
}
