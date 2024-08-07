import s from "../documents.module.css";
import cs from "../../../../commonStyles.module.scss";
import { Section } from "@/components/ui/Section/Section";
import FaqSection from "@/components/Faq/FaqSection/FaqSection";
import { Contacts } from "@/app/[locale]/(public)/documents/_components/Contacts/Contacts";
import Navigation from "@/app/[locale]/(public)/documents/_components/Navigation/Navigation";
import Content from "@/app/[locale]/(public)/documents/_components/Content/Content";
import {
  termsNavigationEN,
  termsNavigationUA,
} from "@/data/documents/terms-and-conditions/termsNavigation";
import {
  generalInformationEN,
  generalInformationUA,
  pointsEN,
  pointsUA,
} from "@/data/documents/terms-and-conditions/termsContent";
import { useTranslations } from "next-intl";

export default function Terms() {
  const t = useTranslations("Legal.Terms");

  return (
    <div className={cs.main}>
      <div className={s.pageWrapper}>
        <Section>
          <p className={s.headerText}>{t("header")}</p>
          <p className={s.navigationTitle}>{t("description")}</p>
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
          <Contacts />
        </Section>
      </div>
      <FaqSection />
    </div>
  );
}
