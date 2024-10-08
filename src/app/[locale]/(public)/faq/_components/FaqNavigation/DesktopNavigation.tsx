import { faqNavigationType } from "@/types/types";
import s from "./FaqNavigation.module.scss";

export function DesktopNavigation(props: { faqNavigation: faqNavigationType }) {
  return (
    <div className={s.desktopNavigationWrapper}>
      <div className={s.desktopNavigation}>
        {props.faqNavigation.map((value, index) => {
          return (
            <a key={index.toString()} href={"#" + index.toString()}>
              {value.title}
            </a>
          );
        })}
      </div>
    </div>
  );
}
