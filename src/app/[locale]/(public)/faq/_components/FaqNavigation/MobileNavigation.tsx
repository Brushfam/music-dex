"use client";
import s from "./FaqNavigation.module.scss";
import { faqNavigationType } from "@/types/types";
import { useState } from "react";
import Image from "next/image";

export function MobileNavigation(props: {
  faqNavigation: faqNavigationType;
  tabText: string;
}) {
  const [open, setOpen] = useState(false);

  function Tab() {
    return (
      <div
        className={s.mobileNavigationTab}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <p>{props.tabText}</p>
          <Image
              src={"/icons/faq/arrow.svg"}
              alt={"arrow"}
              width={6}
              height={10}
              style={open ? { rotate: "180deg" } : {}}
          />
      </div>
    );
  }

  return (
    <div className={s.mobileNavigationWrapper}>
      <Tab />
      {open ? (
        <div className={s.mobileNavigation}>
          {props.faqNavigation.map((value, index) => {
            return (
              <a key={index.toString()} href={"#" + index.toString()}>
                {value.title}
              </a>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
