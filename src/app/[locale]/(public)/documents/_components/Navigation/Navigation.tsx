"use client";

import { useLocale } from "use-intl";
import s from "../../documents.module.css";

export default function Navigation(props: {
  navigationEN: { point: string }[];
  navigationUA: { point: string }[];
}) {
  const currentLocale = useLocale();
  let navigationData =
    currentLocale === "uk" ? props.navigationUA : props.navigationEN;

  return (
    <div className={s.NavigationWrapper}>
      {navigationData.map((item, i) => {
        return (
          <a
            key={i.toString()}
            href={"#point" + (i + 1).toString()}
            className={s.navigationText}
          >
            <div>
              {i + 1}. {item.point}
            </div>
          </a>
        );
      })}
    </div>
  );
}
