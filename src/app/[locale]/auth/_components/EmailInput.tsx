import React from "react";
import s from "@/app/[locale]/auth/Auth.module.scss";

export function EmailInput(props: {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  email: string;
}) {
  return (
    <input
      type="email"
      placeholder="Email"
      autoComplete={"off"}
      autoCorrect={"off"}
      spellCheck={"false"}
      value={props.email}
      onChange={(e) => {
        props.setEmail(e.target.value);
      }}
      className={s.formInput}
      style={{ marginBottom: 10 }}
    />
  );
}
