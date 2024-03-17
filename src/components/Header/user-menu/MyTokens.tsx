"use client";

import cs from "@/app/commonStyles.module.scss";
import { useEffect, useState } from "react";
import { UserTokensModal } from "@/components/Header/modals/UserTokensModal";
import { UseUser } from "@/context/UserContext";
import { tokensAddresses } from "@/data/tracksData";
import { getUserTokensData } from "@/services/unipass";

export function MyTokens() {
  const userContext = UseUser();
  const [open, setOpen] = useState(false);
  const [userBalances, setUserBalances] = useState<number[]>([]);
  const [userEarning, setUserEarning] = useState<number[]>([]);

  useEffect(() => {
    const tokenAddressesArray = [
      tokensAddresses.ukrainianSun,
      tokensAddresses.myKyiv,
      tokensAddresses.og044,
    ];

    let promises = getUserTokensData(
      userContext.currentUser,
      tokenAddressesArray,
    );

    promises.then((promisesArray) => {
      Promise.all(promisesArray).then((data) => {
        let balances = [];
        let earnings = [];

        for (let i = 0; i < data.length; i += 1) {
          balances.push(data[i].amount);
          earnings.push(data[i].earning);
        }
        setUserBalances(balances);
        setUserEarning(earnings);
      });
    });
  }, [userContext.currentUser]);

  return (
    <div style={{ position: "relative" }}>
      <button
        type={"button"}
        className={cs.headerButton}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {open ? <p>Close</p> : <p>My tokens</p>}
      </button>
      {open ? (
        <UserTokensModal
          userBalances={userBalances}
          userEarning={userEarning}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
