"use client";

import s from "./Modals.module.scss";
import Image from "next/image";
import { UseUser } from "@/context/UserContext";
import { hasAgreement, unipassLogin } from "@/services/unipass";

export function LoginMethodsModal() {
  let userContext = UseUser();

  function emailOnClick() {
    let res = unipassLogin();
    res
      .then((address) => {
        if (address) {
          loginSetup(address);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function loginSetup(address: string) {
    userContext.login(address);
    let agreementPromise = hasAgreement(address);
    agreementPromise.then((value) => {
      userContext.setHasAgreement(value);
    });
  }

  return (
    <div className={s.wrapper}>
      <div className={s.block}>
        <div className={s.loginRow}>
          <p>via walletConnect</p>
          <Image
            src={"/icons/wallet.svg"}
            alt={"wallet icon"}
            width={20}
            height={20}
          />
        </div>
        <div
          className={s.loginRow}
          onClick={() => {
            emailOnClick();
          }}
        >
          <p>via email</p>
          <Image
            src={"/icons/email.svg"}
            alt={"email icon"}
            width={18}
            height={13}
          />
        </div>
      </div>
    </div>
  );
}
