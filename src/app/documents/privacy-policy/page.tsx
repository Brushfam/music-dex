import s from "../documents.module.css";
import cs from "../../commonStyles.module.scss";
import { Header } from "@/components/Header/Header";
import { Section } from "@/components/ui/Section/Section";
import Faq from "@/components/Faq/Faq";
import { Footer } from "@/components/Footer/Footer";
import Navigation from "@/app/documents/privacy-policy/Navigation";
import Content from "@/app/documents/privacy-policy/Content";
import { Contacts } from "@/app/documents/components/Contacts/Contacts";
import { DocsProvider } from "@/context/DocsContext";

export default function PrivacyPolicy() {
  return (
    <DocsProvider>
      <div className={cs.main}>
        <Header />
        <div className={s.pageWrapper}>
          <Section id={"privacy-policy"}>
            <div className={s.titleBlock}>
              <p className={s.headerText}>MusicDex Privacy Policy</p>
              <p className={s.lastUpdatedText}>Last updated Feb 27, 2024</p>
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
