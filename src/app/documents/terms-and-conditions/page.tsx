import s from "../documents.module.css";
import cs from "../../commonStyles.module.scss";
import { Header } from "@/components/Header/Header";
import { Section } from "@/components/ui/Section/Section";
import Faq from "@/components/Faq/Faq";
import { Footer } from "@/components/Footer/Footer";
import Navigation from "@/app/documents/terms-and-conditions/Navigation";
import Content from "@/app/documents/terms-and-conditions/Content";
import {Contacts} from "@/app/documents/components/Contacts";

export default function Terms() {
  return (
    <div className={cs.main}>
      <Header />
      <div className={s.pageWrapper}>
        <Section id={"privacy-policy"}>
          <div className={s.titleBlock}>
            <p className={s.headerText}>ДОГОВІР ПРО УМОВИ І ПРАВИЛА КОРИСТУВАННЯ</p>
          </div>
          <Navigation />
          <Content />
            <Contacts/>
        </Section>
      </div>
      <Faq />
      <Footer />
    </div>
  );
}
