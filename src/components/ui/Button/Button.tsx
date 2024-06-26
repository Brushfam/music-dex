import s from "./Button.module.scss";
import Image from "next/image";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { Fragment } from "react";

interface ColorsType {
  [key: string]: string;
}

type ButtonType = "button" | "submit" | "reset" | undefined;

const colors: ColorsType = {
  main: s.buttonDiv_main,
  transparent: s.buttonDiv_transparent,
  grey: s.buttonDiv_grey,
  loading: s.buttonDiv_loading,
};

export function Button(props: {
  title: string;
  color: string;
  arrow: boolean;
  type?: ButtonType;
  path?: string;
  action?: () => void;
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
      onClick={props.action}
    >
      <Content />
    </LocalLink>
  ) : (
    <button
      type={props.type ?? "button"}
      className={colors[props.color]}
      onClick={props.action}
    >
      <Content />
    </button>
  );
}
