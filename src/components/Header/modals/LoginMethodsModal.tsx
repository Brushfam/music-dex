"use client";

import s from "./Modals.module.scss";
import Image from "next/image";
import { UseUser } from "@/context/UserContext";
import { getTrackOwnerData } from "@/services/helpers";
import { useEffect } from "react";
import {
  useConnect,
  Connector,
  useAccount,
} from "@starknet-react/core";

export function LoginMethodsModal() {
  let userContext = UseUser();
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const walletLinkList = ["https://www.argent.xyz/", "https://braavos.app/"];

  useEffect(() => {
    if (address) {
      userContext.login(address, getTrackOwnerData(address), "Starknet");
    }
  }, [address, userContext]);

  function WalletIcon() {
    return (
      <Image
        src={"/icons/wallet.svg"}
        alt={"wallet icon"}
        width={20}
        height={20}
      />
    );
  }

  return (
    <div className={s.wrapper}>
      <div className={s.loginBlock}>
        {connectors.map((connector: Connector, index) => {
          const available = connector.available();
          const name = connector.name;
          return available ? (
            <div
              key={index.toString()}
              onClick={() => connect({ connector })}
              className={s.loginBlock_row}
            >
              <p>{name}</p>
              <WalletIcon />
            </div>
          ) : (
            <a
              key={index.toString()}
              href={walletLinkList[index]}
              target={"_blank"}
              className={s.loginBlock_row}
            >
              <p>{name}</p>
              <WalletIcon />
            </a>
          );
        })}
      </div>
    </div>
  );
}
