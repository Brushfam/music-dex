import s from "../documents.module.css";
import cs from "../../../commonStyles.module.scss";
import { Header } from "@/components/Header/Header";
import { Section } from "@/components/ui/Section/Section";
import Faq from "@/components/Faq/Faq";
import { Footer } from "@/components/Footer/Footer";
import { Contacts } from "@/app/[locale]/documents/_components/Contacts/Contacts";
import Navigation from "@/app/[locale]/documents/_components/Navigation/Navigation";
import Content from "@/app/[locale]/documents/_components/Content/Content";
import {
  termsNavigationEN,
  termsNavigationUA,
} from "@/data/documents/terms-and-conditions/termsNavigation";
import {
  generalInformationEN,
  generalInformationUA, pointsEN, pointsUA,
} from "@/data/documents/terms-and-conditions/termsContent";
import {useTranslations} from "next-intl";

export default function Terms() {
  const t = useTranslations("Terms");

  return (
    <div className={cs.main}>
      <Header />
      <div className={s.pageWrapper}>
        <Section id={"terms-and-conditions"}>
          <p className={s.headerText}>{t("header")}</p>
          <p className={s.navigationTitle}>
            {t("description")}
          </p>
          <Navigation
              navigationEN={termsNavigationEN}
              navigationUA={termsNavigationUA}
          />
          <Content
              introductionEN={generalInformationEN}
              introductionUA={generalInformationUA}
              pointsEN={pointsEN}
              pointsUA={pointsUA}
          />
          <Contacts/>
        </Section>
      </div>
      <Faq/>
      <Footer/>
    </div>
  );
}
