"use client";

import s from "./ForArtist.module.scss";
import { YoutubeVideo } from "@/app/[locale]/(public)/for-artist/_components/YoutubeVideo";
import {MainText} from "@/app/[locale]/(public)/for-artist/_components/MainText";
import {Cards} from "@/app/[locale]/(public)/for-artist/_components/Cards";
import {ReachOut} from "@/app/[locale]/(public)/for-artist/_components/ReachOut";

export default function ForArtist() {
  return (
    <div className={s.banner}>
      <YoutubeVideo id={"vhOdMyKWkog"} />
      <MainText/>
        <Cards/>
        <ReachOut/>
    </div>
  );
}
