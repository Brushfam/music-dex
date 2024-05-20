import cs from "../../commonStyles.module.scss";
import s from "./page.module.scss";
import { Section } from "@/components/ui/Section/Section";
import {FaqContent} from "@/app/[locale]/faq/_components/FaqContent";

export default function FAQ() {
  return (
    <div className={cs.main}>
      <Section>
        <div className={s.titleBlock}>
          <h2>FAQ</h2>
        </div>
        <FaqContent/>
      </Section>
    </div>
  );
}
