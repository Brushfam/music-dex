import { PageWrapper } from "@/app/[locale]/(private)/profile/PageWrapper";
import { Info } from "@/app/[locale]/(private)/profile/_artist/profile/info/Info";
import { useTranslations } from "next-intl";

export default function Profile() {
  const t = useTranslations("ProfileArtist.Profile");

  return (
    <PageWrapper title={t("title")} height={"full"} loading={false}>
      <p style={{ color: "white", fontSize: 20, marginBottom: 36 }}>
        {t("form_title")}
      </p>
      <Info />
    </PageWrapper>
  );
}
