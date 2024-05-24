"use client";

import cs from "@/app/commonStyles.module.scss";
import s from "@/components/Header/Header.module.scss";
import { useEffect, useState } from "react";
import { UserTokensModal } from "@/components/Header/modals/UserTokensModal";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { strkGetUserData } from "@/services/blockchain/server";
import { trackAddresses } from "@/data/tracksData";
import { roundToTwo } from "@/services/helpers";
import { useUserStore } from "@/store/user";

export function MyTokens() {
  const t = useTranslations("Header");
  const currentUser = useUserStore((state) => state.currentUser);
  const latestPurchase = useUserStore((state) => state.latestPurchase);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userBalances, setUserBalances] = useState<string[]>([]);
  const [userEarning, setUserEarning] = useState<string[]>([]);

  useEffect(() => {
    let tokensDataPromise = strkGetUserData(currentUser, trackAddresses.dealer);
    tokensDataPromise.then((rawData) => {
      let values = [];
      let k: keyof typeof rawData;
      for (k in rawData) {
        try {
          let balance = Number(rawData[k]) / 10;
          values.push(roundToTwo(balance).toString());
        } catch (e) {
          console.log(e);
          values.push("");
        }
      }
      setUserBalances([values[0].toString()]);
      setUserEarning([values[1].toString()]);
      setLoading(false);
    });
  }, [currentUser, latestPurchase]);

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
