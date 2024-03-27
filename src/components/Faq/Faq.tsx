"use client";
import s from "@/app/[locale]/page.module.scss";
import { ColumnContainer } from "@/components/ui/Containers/Containers";
import { FaqCard } from "@/components/Faq/FaqCard/FaqCard";
import { faqDataEN, faqDataUK } from "@/data/components/faqData";
import { Section } from "@/components/ui/Section/Section";
import { useTranslations } from "next-intl";
import { useLocale } from "use-intl";

export default function Faq() {
  const currentLocale = useLocale();
  const faqQuestions = currentLocale === "en" ? faqDataEN : faqDataUK;
  const firstQuestion = faqQuestions[0];

  return (
    <Section id={"home-faq"}>
      <div className={s.faqContainer}>
        <ColumnContainer>
          <h3>FAQ</h3>
        </ColumnContainer>
        <ColumnContainer>
          <FaqCard
            question={firstQuestion.question}
            answer={firstQuestion.answer}
            first={true}
          ></FaqCard>
          {faqQuestions.slice(1, faqQuestions.length).map((data, index) => {
            return (
              <FaqCard
                key={index.toString()}
                question={data.question}
                answer={data.answer}
              />
            );
          })}
        </ColumnContainer>
      </div>
    </Section>
  );
}
