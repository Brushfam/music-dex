"use client";

import {
  artistFaqEN,
  artistFaqUA,
  faqTitlesEN,
  faqTitlesUA,
} from "@/data/profile/artistFaq";
import Image from "next/image";
import { useState } from "react";
import { useLocale } from "use-intl";
import s from "./FaqList.module.scss";

export function FaqList() {
  const currentLocale = useLocale();
  const artistTitles = currentLocale === "en" ? faqTitlesEN : faqTitlesUA;
  const artistQuestions = currentLocale === "en" ? artistFaqEN : artistFaqUA;

  function QuestionRow(props: {
    index: number;
    titleText: string;
    question: string;
    answer: string;
  }) {
    const [open, setOpen] = useState(false);

    return (
      <div
        key={props.titleText + "questionsSection" + props.index.toString()}
        className={s.faqItem}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p className={s.question}>{props.question}</p>
          {open ? (
            <Image
              src={"/profile/minus.svg"}
              alt={"minus"}
              width={16}
              height={2}
            />
          ) : (
            <Image
              src={"/profile/plus.svg"}
              alt={"plus"}
              width={21}
              height={21}
            />
          )}
        </div>
        {open ? <p className={s.answer}>{props.answer}</p> : null}
      </div>
    );
  }

  function QuestionBlock(props: {
    questionsSection: { question: string; answer: string }[];
    titleText: string;
  }) {
    return props.questionsSection.map((item, index) => {
      return (
        <QuestionRow
          key={props.titleText + "QuestionRow" + index.toString()}
          titleText={props.titleText}
          index={index}
          question={item.question}
          answer={item.answer}
        />
      );
    });
  }

  return (
    <div>
      {artistTitles.map((title, index) => {
        return (
          <div key={title + index.toString()}>
            <p className={s.title}>{title}</p>
            <QuestionBlock
              titleText={title}
              questionsSection={artistQuestions[index]}
            />
          </div>
        );
      })}
    </div>
  );
}
