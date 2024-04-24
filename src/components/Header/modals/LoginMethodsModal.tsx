"use client";

import s from "./Modals.module.scss";
import Image from "next/image";
import { UseUser } from "@/context/UserContext";
import { getTrackOwnerData } from "@/services/helpers";
import { useEffect } from "react";
import { useConnect, Connector, useAccount } from "@starknet-react/core";

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
              <Image
                  src={"/logos/Braavos.svg"}
                  alt={"Braavos logo"}
                  width={22}
                  height={22}
              />
            </div>
          ) : (
            <a
              key={index.toString()}
              href={walletLinkList[index]}
              target={"_blank"}
              className={s.loginBlock_row}
            >
              <p>{name}</p>
              <Image
                  src={"/logos/Argent-X.png"}
                  alt={"Argent-X logo"}
                  width={25}
                  height={25}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
