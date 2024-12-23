import { createSharedPathnamesNavigation } from "next-intl/navigation";
import Image from "next/image";
import { Fragment } from "react";
import s from "./Button.module.scss";

interface ColorsType {
  [key: string]: string;
}

type ButtonType = "button" | "submit" | "reset" | undefined;

const colors: ColorsType = {
  main: s.buttonDiv_main,
  transparent: s.buttonDiv_transparent,
  grey: s.buttonDiv_grey,
  loading: s.buttonDiv_loading,
  black: s.buttonDiv_black,
};

export function Button(props: {
  title: string;
  color: string;
  arrow: boolean;
  type?: ButtonType;
  path?: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
  action?: () => void;
  fullLength?: boolean;
  between?: boolean;
}) {
  const { Link: LocalLink } = createSharedPathnamesNavigation({
    locales: ["en", "uk"],
  });

  function Content() {
    return (
      <Fragment>
        <p>{props.title}</p>
        {props.arrow ? (
          <Image
            src={"/icons/button-arrow.svg"}
            alt={"arrow"}
            width={16}
            height={16}
          />
        ) : null}
      </Fragment>
    );
  }

  return props.path ? (
    <LocalLink
      href={props.path}
      className={colors[props.color]}
      style={props.fullLength ? { width: "100%" } : {}}
      onClick={props.action}
      target={props.target}
    >
      <Content />
    </LocalLink>
  ) : (
    <button
      type={props.type ?? "button"}
      className={colors[props.color]}
      style={
        props.fullLength
          ? {
              width: "100%",
              justifyContent: props.between ? "space-between" : "",
            }
          : {}
      }
      onClick={props.action}
    >
      <Content />
    </button>
  );
}
