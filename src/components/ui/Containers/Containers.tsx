import React from "react";

export function ColumnContainer(props: {
  children: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <div
      style={
        props.centered
          ? { display: "flex", flexDirection: "column", alignItems: "center" }
          : {
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }
      }
    >
      {props.children}
    </div>
  );
}
