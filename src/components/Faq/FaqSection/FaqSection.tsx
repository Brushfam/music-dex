"use client";
import s from "./FaqSection.module.scss";
import { ColumnContainer } from "@/components/ui/Containers/Containers";
import { faqDataEN, faqDataUK } from "@/data/components/faqData";
import { Section } from "@/components/ui/Section/Section";
import { useLocale } from "use-intl";
import { Button } from "@/components/ui/Button/Button";
import { FaqBlock } from "@/components/Faq/FaqBlock/FaqBlock";

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
