import s from "./Button.module.scss";
import Image from "next/image";
import {createSharedPathnamesNavigation} from 'next-intl/navigation';

export function Button(props: { title: string; color: string; path: string }) {
  const { Link: LocalLink } = createSharedPathnamesNavigation({
    locales: ["en", "uk"],
  });

  return (
    <LocalLink
      href={props.path || "/"}
      className={props.color === "red" ? s.buttonDiv_red : s.buttonDiv_transparent}
    >
      <p>{props.title}</p>
      <Image
        src={"/icons/button-arrow.svg"}
        alt={"arrow"}
        width={16}
        height={16}
      />
    </LocalLink>
  );
}
