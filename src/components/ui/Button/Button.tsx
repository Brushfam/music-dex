import s from "./Button.module.scss";
import Image from "next/image";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

interface ColorsType {
  [key: string]: string;
}

export function Button(props: {
  title: string;
  color: string;
  arrow: boolean;
  path?: string;
  action?: () => void;
}) {
  const colors: ColorsType = {
    main: s.buttonDiv_main,
    transparent: s.buttonDiv_transparent,
    grey: s.buttonDiv_grey,
    loading: s.buttonDiv_loading,
  };

  const { Link: LocalLink } = createSharedPathnamesNavigation({
    locales: ["en", "uk"],
  });

  function Arrow(props: { parameter: boolean }) {
    return props.parameter ? (
      <Image
        src={"/icons/button-arrow.svg"}
        alt={"arrow"}
        width={16}
        height={16}
      />
    ) : null;
  }

  return props.path ? (
    <LocalLink
      href={props.path}
      className={colors[props.color]}
      onClick={props.action}
    >
      <p>{props.title}</p>
      <Arrow parameter={props.arrow} />
    </LocalLink>
  ) : (
    <button
      type={"button"}
      className={colors[props.color]}
      onClick={props.action}
    >
      <p>{props.title}</p>
      <Arrow parameter={props.arrow} />
    </button>
  );
}
