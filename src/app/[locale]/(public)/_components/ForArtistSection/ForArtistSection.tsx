"use client";

import { Button } from "@/components/ui/Button/Button";
import { Section } from "@/components/ui/Section/Section";
import { useTranslations } from "next-intl";
import s from "./ForArtistSection.module.scss";

export const ForArtistSection = () => {
  const t = useTranslations("Home");

  return (
    <div className={s.forArtist} id={"for-artist"}>
      <Section
        style={{
          alignItems: "center",
        }}
      >
        <div className={s.forArtist_container}>
          <div className={s.forArtist_left}>
            <h2>{t("for_artist_description")}</h2>
            <div className={s.forArtist_btnGroup}>
              <Button
                title={t("for_artist_btn1")}
                color="black"
                arrow={false}
                path={`/for-artist`}
              />
              <Button
                title={t("for_artist_btn2")}
                color="black"
                arrow={false}
                path={`/for-artist`}
              />
            </div>
          </div>
          <div className={s.forArtist_right}>
            <img
              src="/for-artist/artist.png"
              alt=""
              className={s.forArtist_imgContainer}
            />
            {/* <div className={s.forArtist_iconMic}>
              <img src="/for-artist/mic.png" alt="" />
            </div>
            <div className={s.forArtist_iconAudio}>
              <img src="/for-artist/audio.png" alt="" />
            </div> */}
          </div>
        </div>
      </Section>
    </div>
  );
};
