import React from "react";
import s from "./Section.module.scss";

export function Section(props: {
  children: React.ReactNode;
  banner?: boolean;
  color?: string;
  id: string;
}) {
  return (
    <section className={props.banner ? s.banner : s.pageSection} id={props.id}>
      {props.children}
    </section>
  );
}
