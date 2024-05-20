import s from "../documents.module.css";
import cs from "../../../commonStyles.module.scss";
import { Section } from "@/components/ui/Section/Section";
import { Contacts } from "@/app/[locale]/documents/_components/Contacts/Contacts";
import FaqSection from "@/components/Faq/FaqSection/FaqSection";
import Navigation from "@/app/[locale]/documents/_components/Navigation/Navigation";
import Content from "@/app/[locale]/documents/_components/Content/Content";
import {
  publicOfferNavigationEN,
  publicOfferNavigationUA,
} from "@/data/documents/public-offer/publicOfferNavigation";
import {
  introductionEN,
  introductionUA,
  pointsEN,
  pointsUA,
} from "@/data/documents/public-offer/publicOfferContent";
import { useTranslations } from "next-intl";

export default function PublicOffer() {
  const t = useTranslations("Legal.PublicOffer");

  return (
    <div className={cs.main}>
      <div className={s.pageWrapper}>
        <Section>
          <p className={s.headerText}>{t("header")}</p>
          <p className={s.secondHeader}>{t("second_header")}</p>
          <Navigation
            navigationEN={publicOfferNavigationEN}
            navigationUA={publicOfferNavigationUA}
          />
          <Content
            introductionEN={introductionEN}
            introductionUA={introductionUA}
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
