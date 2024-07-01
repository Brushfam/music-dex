import { useTranslations } from "next-intl";
import { PageWrapper } from "@/app/[locale]/(private)/profile/PageWrapper";
import { Info } from "@/app/[locale]/(private)/profile/_artist/profile/info/Info";

export default function Profile() {
  const t = useTranslations("ProfileInvestor.Profile");

  return (
    <PageWrapper title={t("title")} height={"full"} loading={false}>
        <p style={{color: "white", fontSize:20, marginBottom: 36}}>Personal info & Settings</p>
      <Info />
    </PageWrapper>
  );
}
