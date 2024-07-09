"use client";

import s from "./ForArtist.module.scss";
import { YoutubeVideo } from "@/app/[locale]/(public)/for-artist/_components/YoutubeVideo";
import { MainText } from "@/app/[locale]/(public)/for-artist/_components/MainText";
import { Cards } from "@/app/[locale]/(public)/for-artist/_components/Cards";
import { ReachOut } from "@/app/[locale]/(public)/for-artist/_components/ReachOut";
import { SubmitSong } from "@/app/[locale]/(public)/for-artist/_components/SubmitSong";

export default function ForArtist() {
  return (
    <div className={s.forArtist}>
      <YoutubeVideo id={"vhOdMyKWkog"} />
      <MainText />
      <SubmitSong />
      <Cards />
      <SubmitSong />
      <ReachOut />
    </div>
  );
}
