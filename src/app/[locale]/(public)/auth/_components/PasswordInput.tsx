import React from "react";
import s from "@/app/[locale]/(public)/auth/Auth.module.scss";
import Image from "next/image";

export function PasswordInput(props: {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  placeholder: string;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  isHidden: boolean;
}) {
  function PasswordIcon() {
    return (
      <div
        className={s.passwordIconWrapper}
        onClick={() => {
          props.setHidden(!props.isHidden);
        }}
      >
        {props.isHidden ? (
          <Image
            src={"/auth/show-password.svg"}
            alt={"show password"}
            width={22}
            height={17}
          />
        ) : (
          <Image
            src={"/auth/hide-password.svg"}
            alt={"hide password"}
            width={22}
            height={21}
          />
        )}
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <input
        type={props.isHidden ? "password" : "text"}
        placeholder={props.placeholder}
        autoComplete={"off"}
        autoCorrect={"off"}
        spellCheck={"false"}
        value={props.password}
        onChange={(e) => props.setPassword(e.target.value)}
        className={s.formInput}
        style={{ marginBottom: 24 }}
      />
      <PasswordIcon />
    </div>
  );
}
