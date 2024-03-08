import s from "../documents.module.css";
import cs from "../../commonStyles.module.scss";
import { Header } from "@/components/Header/Header";
import { Section } from "@/components/ui/Section/Section";
import Faq from "@/components/Faq/Faq";
import { Footer } from "@/components/Footer/Footer";
import Navigation from "@/app/documents/terms-and-conditions/Navigation";
import Content from "@/app/documents/terms-and-conditions/Content";
import { Contacts } from "@/app/documents/components/Contacts/Contacts";
import { DocsProvider } from "@/context/DocsContext";

export default function Terms() {
  return (
    <DocsProvider>
      <div className={cs.main}>
        <Header />
        <div className={s.pageWrapper}>
          <Section id={"terms-and-conditions"}>
            <div className={s.titleBlock}>
              <p className={s.headerText}>
                TERMS OF USE
              </p>
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