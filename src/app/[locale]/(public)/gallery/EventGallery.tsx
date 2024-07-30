"use client";

import Fancybox from "@/app/[locale]/(public)/gallery/Fancybox";
import * as React from "react";
import { galleryData } from "@/data/galleryData";
import s from "@/app/[locale]/(public)/gallery/Gallery.module.scss";

function ArrowIcon() {
  return (
    <svg
      width="16.000000"
      height="16.000000"
      viewBox="0 0 16 16"
      fill="none"
      transform="rotate(180)"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <clipPath id="clip19_14607">
          <rect
            id="Chevron Right"
            width="16.000000"
            height="16.000000"
            fill="white"
            fillOpacity="0"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#clip19_14607)">
        <path
          id="back-button-arrow"
          d="M5.33334 13.3334L10.6667 8.00012L5.33334 2.66675"
          stroke="#FFFFFF"
          strokeOpacity="1.000000"
          strokeWidth="1.500000"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function EventGallery(props: {
  eventNumber: number;
  setEvent: React.Dispatch<React.SetStateAction<number | null>>;
  backButtonText: string;
}) {
  const event = galleryData[props.eventNumber];
  const numbersArray = Array.from(Array(event.imageNumber).keys()).map(
    (i) => i + 1,
  );

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
