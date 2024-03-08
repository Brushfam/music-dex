"use client";
import s from "../documents.module.css";
import { UseDocs } from "@/context/DocsContext";
import {publicOfferNavigationEN, publicOfferNavigationUA} from "@/data/documents/public-offer/publicOfferNavigation";

export default function Navigation() {
  const docsContext = UseDocs();
  let navigationData =
    docsContext.lang === "UA" ? publicOfferNavigationUA : publicOfferNavigationEN;

  return (
    <div className={s.NavigationWrapper}>
      <p className={s.navigationText} style={{ cursor: "auto" }}>
        Agreement on the Terms and Conditions of Use
      </p>
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
