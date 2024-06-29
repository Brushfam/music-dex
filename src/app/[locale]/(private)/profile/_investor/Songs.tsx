"use client";

import { useTranslations } from "next-intl";
import { PageWrapper } from "@/app/[locale]/(private)/profile/PageWrapper";
import { useRouter } from "next/navigation";
import { useLocale } from "use-intl";
import { useEffect, useState } from "react";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { getUserSongs } from "@/services/users/investors";
import s from "@/app/[locale]/(private)/profile/_investor/songs/Songs.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { SongHeader } from "@/app/[locale]/(private)/profile/_investor/songs/SongHeader";
import { SongRow } from "@/app/[locale]/(private)/profile/_investor/songs/SongRow";

export default function Songs() {
  const t = useTranslations("ProfileInvestor.Songs");
  const router = useRouter();
  const currentLocale = useLocale();

  const [dealerAmount, setDealerAmount] = useState(0);
  const [lastDate, setLastDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const response = await getUserSongs(token);
        if (response.data.tokens) {
          setDealerAmount(response.data.tokens);
        }
        if (response.data.date) {
          setLastDate(response.data.date);
        }
        setLoading(false);
      } else {
        router.replace("/en/auth/login?expired-session=true");
      }
    });
  }, [router]);

  function NoSongBlock() {
    return (
      <div className={s.noSongBlock}>
        <p className={s.noSongBlock_title}>{t("no_songs")}</p>
        <p className={s.noSongBlock_description}>{t("choose_song")}</p>
        <Button
          title={t("invest")}
          color={"main"}
          arrow={false}
          path={"/catalog"}
        />
      </div>
    );
  }

  function getInvestedSum() {
    const sum = dealerAmount * 2.2;
    return parseFloat(sum.toFixed(2));
  }

  function SongList() {
    return dealerAmount ? (
      <div style={{display: "flex", flexDirection: "column"}}>
        <div className={s.titleBlock}>
          <p className={s.titleBlock_text}>{t("list_of_songs")}</p>
          <Button
            title={t("invest")}
            color={"main"}
            arrow={false}
            path={"/catalog"}
          />
        </div>
        <SongHeader />
        <SongRow
          lastDate={lastDate}
          song={"Дилер"}
          tokens={dealerAmount}
          invested={getInvestedSum()}
          songLink={"/" + currentLocale + "/tracks/dealer"}
        />
      </div>
    ) : (
      <div className={s.songListSubPageEmpty}>
        <NoSongBlock />
      </div>
    );
  }

  return (
    <PageWrapper title={t("title")} height={"auto"} loading={loading}>
      <SongList />
    </PageWrapper>
  );
}
