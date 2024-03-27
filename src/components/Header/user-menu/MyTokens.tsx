"use client";

import cs from "@/app/commonStyles.module.scss";
import s from "@/components/Header/Header.module.scss";
import { useEffect, useState } from "react";
import { UserTokensModal } from "@/components/Header/modals/UserTokensModal";
import { UseUser } from "@/context/UserContext";
import { getUsersData } from "@/services/unipass-server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { dealerAddress, myKyivAddress } from "@/data/contractsData";
import { roundToTwo } from "@/services/helpers";

export function MyTokens() {
  const t = useTranslations("Header");
  const userContext = UseUser();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userBalances, setUserBalances] = useState<number[]>([]);
  const [userEarning, setUserEarning] = useState<number[]>([]);

  useEffect(() => {
    const tokenAddressesArray = [dealerAddress];

    let tokensDataPromise = getUsersData(
      userContext.currentUser,
      tokenAddressesArray,
    );
    tokensDataPromise.then((rawData) => {
      const data = JSON.parse(rawData)
      let balances = [];
      let earnings = [];
      let usdtDecimals = 1_000_000;

      for (let i = 0; i < data.length; i += 1) {
        if (!data[i].amount) {
          continue;
        }
        balances.push(data[i].amount);
        let earning = roundToTwo(data[i].earning / usdtDecimals);
        earnings.push(earning);
      }
      setUserBalances(balances);
      setUserEarning(earnings);
      setLoading(false);
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
          loading={loading}
          userBalances={userBalances}
          userEarning={userEarning}
        />
      ) : null}
    </div>
  );
}
