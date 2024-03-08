import s from "../documents.module.css";
import cs from "../../commonStyles.module.scss";
import { Header } from "@/components/Header/Header";
import { Section } from "@/components/ui/Section/Section";
import { Contacts } from "@/app/documents/components/Contacts/Contacts";
import Faq from "@/components/Faq/Faq";
import { Footer } from "@/components/Footer/Footer";
import { DocsProvider } from "@/context/DocsContext";
import Navigation from "@/app/documents/public-offer/Navigation";
import Content from "@/app/documents/public-offer/Content";

export default function PublicOffer() {
  return (
    <DocsProvider>
      <div className={cs.main}>
        <Header />
        <div className={s.pageWrapper}>
          <Section id={"privacy-policy"}>
            <div className={s.titleBlock}>
              <p className={s.headerText}>PUBLIC OFFER AGREEMENT</p>
            </div>
            <Navigation />
            <Content />
            <Contacts />
          </Section>
        </div>
        <Faq />
        <Footer />
      </div>
    </DocsProvider>
  );
}
