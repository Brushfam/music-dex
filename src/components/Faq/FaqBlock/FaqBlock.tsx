import { FaqCard } from "@/components/Faq/FaqCard/FaqCard";
import { ColumnContainer } from "@/components/ui/Containers/Containers";
import { faqContentType } from "@/types/types";
import React from "react";

export function FaqBlock(props: {
  children?: React.ReactNode;
  faqQuestions: faqContentType;
}) {
  const firstQuestion = props.faqQuestions[0];
  return (
    <ColumnContainer>
      <FaqCard
        question={firstQuestion.question}
        answer={firstQuestion.answer}
        first={true}
      ></FaqCard>
      {props.faqQuestions
        .slice(1, props.faqQuestions.length)
        .map((data, index) => {
          return (
            <FaqCard
              key={index.toString()}
              question={data.question}
              answer={data.answer}
            />
          );
        })}
      {props.children}
    </ColumnContainer>
  );
}
