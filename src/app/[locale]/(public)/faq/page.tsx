import { FaqContent } from "@/app/[locale]/(public)/faq/_components/FaqContent";
import { Section } from "@/components/ui/Section/Section";
import cs from "../../../commonStyles.module.scss";
import s from "./page.module.scss";

export default function FAQ() {
  return (
    <div className={cs.main}>
      <Section>
        <div className={s.titleBlock}>
          <h2>FAQ</h2>
        </div>
        <FaqContent />
      </Section>
    </div>
  );
}
