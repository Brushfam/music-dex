"use client";

import { EventBlock } from "@/app/[locale]/(public)/gallery/EventBlock";
import { EventGallery } from "@/app/[locale]/(public)/gallery/EventGallery";
import { galleryData } from "@/data/galleryData";
import { useTranslations } from "next-intl";
import { useState } from "react";
import s from "./Gallery.module.scss";

export default function Gallery() {
  const t = useTranslations("Gallery");
  const [event, setEvent] = useState<number | null>(null);

  function EventList() {
    return (
      <div className={s.eventList}>
        {galleryData.map((ev, i) => {
          return (
            <div
              key={i.toString()}
              onClick={() => {
                setEvent(i);
              }}
            >
              <EventBlock title={ev.title} date={ev.date} folder={ev.folder} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={s.galleryWrapper}>
      <div className={s.blogTitleBlock}>
        <p className={s.blogTitleBlock_title}>{t("title")}</p>
        <p className={s.blogTitleBlock_description}>{t("description")}</p>
      </div>
      {event === null ? (
        <EventList />
      ) : (
        <EventGallery
          eventNumber={event}
          setEvent={setEvent}
          backButtonText={t("back_button")}
        />
      )}
    </div>
  );
}
