"use client";

import cs from "@/app/commonStyles.module.scss";
import s from "@/components/Header/Header.module.scss";
import { useEffect, useState } from "react";
import { UserTokensModal } from "@/components/Header/modals/UserTokensModal";
import { UseUser } from "@/context/UserContext";
import { getUsersData } from "@/services/blockchain/serverMethods";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { dealerAddress } from "@/data/contractsData";
import { roundToTwo } from "@/services/helpers";

export function MyTokens() {
  const t = useTranslations("Header");
  const [open, setOpen] = useState(false);

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
          loading={false}
          userBalances={[]}
          userEarning={[]}
        />
      ) : null}
    </div>
  );
}
