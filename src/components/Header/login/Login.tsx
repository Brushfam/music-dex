"use client";

import s from "./Login.module.scss";
import { useState } from "react";
import { LoginButton } from "@/components/Header/login/LoginButton";
import { LoginMethodsModal } from "@/components/Header/modals/LoginMethodsModal";

export function Login() {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div className={s.wrapper}>
      <LoginButton open={openLogin} openModal={setOpenLogin} />
      {openLogin ? <LoginMethodsModal /> : <></>}
    </div>
  );
}
