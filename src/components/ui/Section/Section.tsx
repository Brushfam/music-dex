import React from "react";
import s from "./Section.module.scss";

export function Section(props: {
  children: React.ReactNode;
  banner?: boolean;
}) {
  return (
    <section className={props.banner ? s.banner : s.pageSection}>
      {props.children}
    </section>
  );
}
