import s from "../documents.module.css";
import cs from "../../../commonStyles.module.scss";
import { Header } from "@/components/Header/Header";
import { Section } from "@/components/ui/Section/Section";
import { Contacts } from "@/app/[locale]/documents/_components/Contacts/Contacts";
import Faq from "@/components/Faq/Faq";
import { Footer } from "@/components/Footer/Footer";
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
import {useTranslations} from "next-intl";

export default function PublicOffer() {
  const t = useTranslations("PublicOffer");
  
  return (
    <div className={cs.main}>
      <Header />
      <div className={s.pageWrapper}>
        <Section id={"privacy-policy"}>
          <p className={s.headerText}>{t("header")}</p>
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
      <Faq />
      <Footer />
    </div>
  );
}
