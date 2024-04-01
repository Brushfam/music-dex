"use client";
import { LoginButton } from "@/components/Header/login/LoginButton";
import { useState } from "react";
import { LoginMethodsModal } from "@/components/Header/modals/LoginMethodsModal";

export function Login() {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <LoginButton open={openLogin} setOpen={setOpenLogin} />
      {openLogin ? <LoginMethodsModal /> : <></>}
    </div>
  );
}
