"use client";

import { useState } from "react";
import { LoginButton } from "@/components/Header/login/LoginButton";
import { LoginMethodsModal } from "@/components/Header/modals/LoginMethodsModal";

export function Login() {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div style={{position: "relative"}}>
      <LoginButton open={openLogin} openModal={setOpenLogin} />
      {openLogin ? <LoginMethodsModal /> : <></>}
    </div>
  );
}
