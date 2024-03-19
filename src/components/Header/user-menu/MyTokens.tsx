"use client";

import cs from "@/app/commonStyles.module.scss";
import s from "@/components/Header/Header.module.scss";
import { useEffect, useState } from "react";
import { UserTokensModal } from "@/components/Header/modals/UserTokensModal";
import { UseUser } from "@/context/UserContext";
import { tokensAddresses } from "@/data/tracksData";
import { getUserTokensData } from "@/services/unipass";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function MyTokens() {
  const t = useTranslations("Header");
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
        {open ? (
          <div className={s.mediaWrapper}>
            <p>{t("close")}</p>
            <Image
              src={"/icons/header/arrow.svg"}
              alt={"arrow"}
              width={18}
              height={10}
            />
          </div>
        ) : (
          <div className={s.mediaWrapper}>
            <p>{t("my_tokens")}</p>
            <Image
              src={"/icons/header/tokens.svg"}
              alt={"tokens"}
              width={18}
              height={18}
            />
          </div>
        )}
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
