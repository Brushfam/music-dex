"use client";

import s from "./Modals.module.scss";
import Image from "next/image";
import { UseUser } from "@/context/UserContext";
import { getTrackOwnerData } from "@/services/helpers";
import { useEffect } from "react";
import { useConnect, Connector, useAccount } from "@starknet-react/core";
import { strkHasAgreement } from "@/services/blockchain/server";

export function LoginMethodsModal() {
  let userContext = UseUser();
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const walletLinkNames = ["Braavos", "Argent X", "Argent mobile"];
  const walletLinkList = [
    "https://braavos.app/",
    "https://www.argent.xyz/",
    "https://www.argent.xyz/",
  ];
  const walletLogosList = [
    "/logos/Braavos.svg",
    "/logos/Argent-X.svg",
    "/logos/Argent.png",
  ];

  useEffect(() => {
    if (address) {
      let agreementPromise = strkHasAgreement(address);
      agreementPromise
        .then((value) => {
          userContext.setHasAgreement(value);
          userContext.login(address, getTrackOwnerData(address));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [address, userContext]);

  function WalletIcon(props: { path: string }) {
    return (
      <Image src={props.path} alt={"Wallet logo"} width={22} height={22} />
    );
  }

  return (
    <div className={s.wrapper}>
      <div className={s.loginBlock}>
        {connectors.map((connector: Connector, index) => {
          const available = connector.available();
          const name = walletLinkNames[index];
          return available ? (
            <div
              key={index.toString()}
              onClick={() => connect({ connector })}
              className={s.loginBlock_row}
            >
              <p>{name}</p>
              <WalletIcon path={walletLogosList[index]} />
            </div>
          ) : (
            <a
              key={index.toString()}
              href={walletLinkList[index]}
              target={"_blank"}
              className={s.loginBlock_row}
            >
              <p>{name}</p>
              <WalletIcon path={walletLogosList[index]} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
