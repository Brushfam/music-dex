import React from "react";

type GreyBlockProps = {
  children: React.ReactNode;
  padding?: number;
  borderRadius?: number;
};

export function GreyBlock(props: GreyBlockProps) {
  const { padding = 6, borderRadius = 8 } = props;

  return (
    <div
      style={{
        padding: padding,
        borderRadius: borderRadius,
        width: "100%",
        border: "1px solid rgba(255, 255, 255, 0.07)",
        background: "rgba(52, 52, 52, 0.5)",
      }}
    >
      {props.children}
    </div>
  );
}
