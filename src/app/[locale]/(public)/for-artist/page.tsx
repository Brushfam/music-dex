"use client";

import { Cards } from "@/app/[locale]/(public)/for-artist/_components/Cards";
import { MainText } from "@/app/[locale]/(public)/for-artist/_components/MainText";
import { ReachOut } from "@/app/[locale]/(public)/for-artist/_components/ReachOut";
import { SubmitSong } from "@/app/[locale]/(public)/for-artist/_components/SubmitSong";
import { YoutubeVideo } from "@/app/[locale]/(public)/for-artist/_components/YoutubeVideo";
import s from "./ForArtist.module.scss";

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
