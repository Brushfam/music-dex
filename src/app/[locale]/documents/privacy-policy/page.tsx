import s from "../documents.module.css";
import cs from "../../../commonStyles.module.scss";
import { Header } from "@/components/Header/Header";
import { Section } from "@/components/ui/Section/Section";
import Faq from "@/components/Faq/Faq";
import { Footer } from "@/components/Footer/Footer";
import Navigation from "@/app/[locale]/documents/privacy-policy/Navigation";
import Content from "@/app/[locale]/documents/privacy-policy/Content";
import { Contacts } from "@/app/[locale]/documents/_components/Contacts/Contacts";
import { useTranslations } from "next-intl";

export default function PrivacyPolicy() {
  const t = useTranslations("PrivacyPolicy");

  return (
    <div className={cs.main}>
      <Header />
      <div className={s.pageWrapper}>
        <Section id={"privacy-policy"}>
          <div className={s.titleBlock}>
            <p className={s.headerText}>{t("header")}</p>
            <p className={s.lastUpdatedText}>{t("last_updated")}</p>
          </div>
          <Navigation />
          <Content />
          <Contacts />
        </Section>
      </div>
      <Faq />
      <Footer />
    </div>
  );
}
