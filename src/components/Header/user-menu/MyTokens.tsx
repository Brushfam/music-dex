"use client";

import cs from "@/app/commonStyles.module.scss";
import s from "@/components/Header/Header.module.scss";
import { useEffect, useState } from "react";
import { UserTokensModal } from "@/components/Header/modals/UserTokensModal";
import { UseUser } from "@/context/UserContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { strkGetUserData } from "@/services/blockchain/server";
import { trackAddresses } from "@/data/tracksData";

export function MyTokens() {
  const t = useTranslations("Header");
  const userContext = UseUser();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userBalances, setUserBalances] = useState<string[]>([]);
  const [userEarning, setUserEarning] = useState<string[]>([]);

  useEffect(() => {
    let tokensDataPromise = strkGetUserData(
      userContext.currentUser,
      trackAddresses.dealer,
    );
    tokensDataPromise.then((rawData) => {
      let values = [];
      let k: keyof typeof rawData;
      for (k in rawData) {
        values.push(rawData[k]);
      }
      setUserBalances([values[0].toString()]);
      setUserEarning([values[1].toString()]);
      setLoading(false);
    });
  }, [userContext.currentUser, userContext.latestPurchase]);

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
