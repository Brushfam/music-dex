import React, { CSSProperties } from "react";
import s from "./Section.module.scss";

export function Section(props: {
  children: React.ReactNode;
  banner?: boolean;
  style?: CSSProperties;
}) {
  return (
    <section
      style={props.style}
      className={props.banner ? s.banner : s.pageSection}
    >
      {props.children}
    </section>
  );
}
