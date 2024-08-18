import { Contacts } from "@/app/[locale]/(public)/documents/_components/Contacts/Contacts";
import Content from "@/app/[locale]/(public)/documents/_components/Content/Content";
import Navigation from "@/app/[locale]/(public)/documents/_components/Navigation/Navigation";
import FaqSection from "@/components/Faq/FaqSection/FaqSection";
import { Section } from "@/components/ui/Section/Section";
import {
  generalInformationEN,
  generalInformationUA,
  pointsEN,
  pointsUA,
} from "@/data/documents/terms-and-conditions/termsContent";
import {
  termsNavigationEN,
  termsNavigationUA,
} from "@/data/documents/terms-and-conditions/termsNavigation";
import { useTranslations } from "next-intl";
import cs from "../../../../commonStyles.module.scss";
import s from "../documents.module.css";

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
