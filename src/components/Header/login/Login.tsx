"use client";
import { LoginButton } from "@/components/Header/login/LoginButton";

export function Login() {

  return (
    <div style={{position: "relative"}}>
        <LoginButton/>
      {/*<LoginButton open={openLogin} openModal={setOpenLogin} />*/}
      {/*{openLogin ? <LoginMethodsModal /> : <></>}*/}
    </div>
  );
}
