"use client";

import s from "./Overview.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { useLocale } from "use-intl";
import Image from "next/image";

export function SuggestedSongs() {
  const currentLocale = useLocale();
  return (
    <div className={s.suggestedSongs}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: 10
        }}
      >
        <p className={s.title}>Statistics</p>
        <Button
          title={"Invest"}
          color={"main"}
          arrow={false}
          path={"/" + currentLocale + "/catalog"}
        />
      </div>
      <a href={"/" + currentLocale + "/tracks/dealer"} className={s.suggestedSongs_song}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p className={s.statisticsBlock_text1}>Дилер</p>
            <p className={s.statisticsBlock_text2}>Tonu Tonite</p>
          </div>
          <Image
            src={"/profile/icons/link-to-song.svg"}
            alt={"arrow"}
            width={10}
            height={10}
          />
      </a>
    </div>
  );
}
