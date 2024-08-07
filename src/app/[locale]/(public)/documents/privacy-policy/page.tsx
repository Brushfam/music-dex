import s from "../documents.module.css";
import cs from "../../../../commonStyles.module.scss";
import { Section } from "@/components/ui/Section/Section";
import FaqSection from "@/components/Faq/FaqSection/FaqSection";
import { Contacts } from "@/app/[locale]/(public)/documents/_components/Contacts/Contacts";
import { useTranslations } from "next-intl";
import Navigation from "@/app/[locale]/(public)/documents/_components/Navigation/Navigation";
import {
  introductionEN,
  introductionUK,
  pointsEN,
  pointsUK,
} from "@/data/documents/privacy-policy/privacyPolicyContent";
import {
  privacyPolicyNavigationEN,
  privacyPolicyNavigationUK,
} from "@/data/documents/privacy-policy/privacyPolicyNavigation";
import Content from "@/app/[locale]/(public)/documents/_components/Content/Content";

export default function PrivacyPolicy() {
  const t = useTranslations("Legal.PrivacyPolicy");

  return (
    <div className={cs.main}>
      <div className={s.pageWrapper}>
        <Section>
          <div className={s.titleBlock}>
            <p className={s.headerText}>{t("header")}</p>
            <p className={s.lastUpdatedText}>{t("last_updated")}</p>
          </div>
          <Navigation
            navigationEN={privacyPolicyNavigationEN}
            navigationUA={privacyPolicyNavigationUK}
          />
          <Content
            introductionEN={introductionEN}
            introductionUA={introductionUK}
            pointsEN={pointsEN}
            pointsUA={pointsUK}
          />
          <Contacts />
        </Section>
      </div>
      <FaqSection />
    </div>
  );
}
