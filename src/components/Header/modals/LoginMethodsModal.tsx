"use client";

import s from "./Modals.module.scss";
import Image from "next/image";
import { UseUser } from "@/context/UserContext";
import { hasAgreement } from "@/services/unipass-server";
import { getTrackOwnerData } from "@/services/helpers";
import {unipassLogin} from "@/services/unipass";

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
    userContext.login(address, getTrackOwnerData(address));
    let agreementPromise = hasAgreement(address);
    agreementPromise.then((value) => {
      userContext.setHasAgreement(value);
    }).catch((e) => {
      console.log(e)
    })
  }

  return (
    <div className={s.wrapper}>
      <div className={s.loginBlock}>
        <div className={s.loginBlock_row}>
          <p>WalletConnect</p>
          <Image
            src={"/icons/wallet.svg"}
            alt={"wallet icon"}
            width={20}
            height={20}
          />
        </div>
        <div
          className={s.loginBlock_row}
          onClick={() => {
            emailOnClick();
          }}
        >
          <p>Email</p>
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
