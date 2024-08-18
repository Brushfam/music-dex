"use client";

import { Button } from "@/components/ui/Button/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useLocale } from "use-intl";
import s from "./Overview.module.scss";

export function SuggestedSongs() {
  const t = useTranslations("ProfileInvestor.Overview");
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
          marginBottom: 10,
        }}
      >
        <p className={s.title}>{t("suggestions")}</p>
        <Button
          title={t("invest")}
          color={"main"}
          arrow={false}
          path={"/catalog"}
        />
      </div>
      <a
        href={"/" + currentLocale + "/tracks/dealer"}
        className={s.suggestedSongs_song}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <p className={s.suggestedSongs_text1}>Дилер</p>
          <p className={s.suggestedSongs_text2}>Tony Tonite</p>
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
