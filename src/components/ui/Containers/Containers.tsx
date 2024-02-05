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

export function SpaceBetweenContainer(props: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {props.children}
    </div>
  );
}

export function RowContainer(props: { children: React.ReactNode, gap: number }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: props.gap
            }}
        >
            {props.children}
        </div>
    );
}
