"use client";

import cs from "@/app/commonStyles.module.scss";
import { Dispatch, SetStateAction } from "react";

export function LoginButton(props: {
  open: boolean;
  openModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      type={"button"}
      className={cs.headerButton}
      onClick={() => {
        props.openModal(!props.open);
      }}
    >
      {props.open ? <p>Close</p> : <p>Log in</p>}
    </button>
  );
}
