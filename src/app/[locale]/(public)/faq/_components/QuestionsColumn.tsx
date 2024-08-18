import s from "@/app/[locale]/(public)/faq/page.module.scss";
import { FaqBlock } from "@/components/Faq/FaqBlock/FaqBlock";
import { faqContentType, faqNavigationType } from "@/types/types";

export function QuestionsColumn(props: {
  faqContent: faqContentType[];
  faqNavigation: faqNavigationType;
}) {
  return (
    <div className={s.questionsColumn}>
      {props.faqContent.map((value, index) => {
        const title = props.faqNavigation[index].title;
        return (
          <div
            key={index.toString()}
            id={index.toString()}
            className={s.questionBlock}
          >
            <p className={s.questionBlock_title}>{title}</p>
            <FaqBlock faqQuestions={value} />
          </div>
        );
      })}
    </div>
  );
}
