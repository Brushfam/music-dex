import { useTranslations } from "next-intl";
import { PageWrapper } from "@/app/[locale]/(private)/profile/PageWrapper";
import s from "@/app/[locale]/(private)/profile/_artist/overview/Overview.module.scss";
import Image from "next/image";

export function Songs() {
  const t = useTranslations("ProfileArtist.Songs");
  return (
    <PageWrapper title={t("title")} height={"auto"} loading={false}>
      <p className={s.title}>{t("list_title")}</p>
      <div style={{ width: "100%", height: 300 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            src={"/profile/empty-list/statistics.svg"}
            alt={"icon"}
            width={50}
            height={50}
          />
          <p className={s.statisticsBlock_text1}>
              {t("empty_song_list")}
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
