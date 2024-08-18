"use client";
import { FaqBlock } from "@/components/Faq/FaqBlock/FaqBlock";
import { Button } from "@/components/ui/Button/Button";
import { ColumnContainer } from "@/components/ui/Containers/Containers";
import { Section } from "@/components/ui/Section/Section";
import { faqDataEN, faqDataUK } from "@/data/components/faqData";
import { useLocale } from "use-intl";
import s from "./FaqSection.module.scss";

export default function FaqSection() {
  const currentLocale = useLocale();
  const isEN = currentLocale === "en";
  const faqButtonTitle = isEN ? "See all questions" : "Всі запитання";
  const faqQuestions = isEN ? faqDataEN : faqDataUK;

  function AllQuestionsButton() {
    return (
      <Button
        title={faqButtonTitle}
        color={"transparent"}
        arrow={true}
        path={"/faq"}
      />
    );
  }

  return (
    <Section>
      <div className={s.faqContainer}>
        <ColumnContainer>
          <h3>FAQ</h3>
          <div className={s.desktopFaqButton}>
            <AllQuestionsButton />
          </div>
        </ColumnContainer>
        <FaqBlock faqQuestions={faqQuestions}>
          <div className={s.mobileFaqButton}>
            <AllQuestionsButton />
          </div>
        </FaqBlock>
      </div>
    </Section>
  );
}
