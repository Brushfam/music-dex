import s from "./GreyBlock.module.scss";
import React, { FC } from "react";

type GreyBlockProps = {
  children: React.ReactNode;
  padding?: number;
  borderRadius?: number;
};

export function GreyBlock(props: GreyBlockProps) {
  const { padding = 6, borderRadius = 8 } = props;

  return (
    <div
      className={s.greyBlock}
      style={{ padding: padding, borderRadius: borderRadius }}
    >
      {props.children}
    </div>
  );
}
