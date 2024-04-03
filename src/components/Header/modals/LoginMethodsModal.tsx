"use client";

import s from "./Modals.module.scss";
import Image from "next/image";
import { UseUser } from "@/context/UserContext";
import { hasAgreement } from "@/services/serverMethods";
import { getTrackOwnerData } from "@/services/helpers";
import { unipassLogin } from "@/services/ethersMethods";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { useEffect } from "react";

export function LoginMethodsModal() {
  let userContext = UseUser();
  const { open: openWalletConnect } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    if (isConnected && address) {
        let agreementPromise = hasAgreement(address);
        agreementPromise
            .then((value) => {
                userContext.setHasAgreement(value);
                userContext.login(address, getTrackOwnerData(address), "WalletConncet");
            })
            .catch((e) => {
                console.log(e);
            });
    }
  }, [address, isConnected, userContext]);

  function unipassOnClick() {
    let res = unipassLogin();
    res
      .then((address) => {
        if (address) {
          loginSetup(address, "Unipass");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

    function loginSetup(address: string, wallet: string) {
        userContext.login(address, getTrackOwnerData(address), wallet);
        let agreementPromise = hasAgreement(address);
        agreementPromise
            .then((value) => {
                userContext.setHasAgreement(value);
            })
            .catch((e) => {
                console.log(e);
            });
    }

  return (
    <div className={s.wrapper}>
      <div className={s.loginBlock}>
        <div
          className={s.loginBlock_row}
          onClick={() => {
            openWalletConnect().catch((e) => console.log(e));
          }}
        >
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
            unipassOnClick();
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
