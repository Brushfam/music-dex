import s from "@/app/page.module.scss";
import { ColumnContainer } from "@/components/ui/Containers/Containers";
import { FaqCard } from "@/components/homepage/FaqCard/FaqCard";
import { faqData, firstQuestion } from "@/data/faqData";
import { Section } from "@/components/ui/Section/Section";

export default function Faq() {
  return (
    <Section id={"home-faq"}>
      <div className={s.faqContainer}>
        <ColumnContainer>
          <h3>FAQ</h3>
          <p className={s.faqDescriptionText}>
            Do you need some help with something or do you have questions on
            some features?
          </p>
        </ColumnContainer>
        <ColumnContainer>
          <FaqCard
            question={firstQuestion.question}
            answer={firstQuestion.answer}
            first={true}
          ></FaqCard>
          {faqData.map((data, index) => {
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
