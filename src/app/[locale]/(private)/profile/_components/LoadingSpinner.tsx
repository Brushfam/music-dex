import { Spinner } from "@/components/Spinner/Spinner";
import { CSSProperties } from "react";

export function LoadingSpinner(props: { fullHeight: boolean }) {
  const baseStyles: CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  const customStyles: CSSProperties = props.fullHeight
    ? { height: "100%" }
    : { height: "auto" };
  const combinedStyles = { ...baseStyles, ...customStyles };

  return (
    <div style={combinedStyles}>
      <Spinner />
    </div>
  );
}
