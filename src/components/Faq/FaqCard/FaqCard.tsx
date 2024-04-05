"use client";
import s from "./FaqCard.module.scss";
import { useState } from "react";

export function FaqCard(props: {
  question: string;
  answer: string;
  first?: boolean;
}) {
  const [question, setQuestion] = useState(false);

  return (
    <div
      className={props.first ? s.firstCard : s.questionCard}
      onClick={() => {
        question ? setQuestion(false) : setQuestion(true);
      }}
    >
      <div className={s.top}>
        <p className={s.question}>{props.question}</p>
        <img
          src={question ? "/icons/faq/minus.svg" : "/icons/faq/plus.svg"}
          alt={"circle"}
        />
      </div>
      {question ? <p className={s.answer}>{props.answer}</p> : <></>}
    </div>
  );
}
