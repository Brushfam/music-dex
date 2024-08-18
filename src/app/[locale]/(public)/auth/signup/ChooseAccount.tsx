"use client";

import s from "@/app/[locale]/(public)/auth/Auth.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { SignUpSteps, UserRoles } from "@/types/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";

export function ChooseAccount(props: {
  setStep: React.Dispatch<React.SetStateAction<SignUpSteps>>;
  setRole: React.Dispatch<React.SetStateAction<UserRoles>>;
}) {
  const t = useTranslations("Auth");
  const [userRole, setUserRole] = useState<UserRoles>(UserRoles.Investor);

  function isInvestor() {
    return userRole === UserRoles.Investor;
  }

  function RadioButtonCircle(props: { selected: boolean }) {
    return (
      <div className={s.radioButtonCircle}>
        {props.selected ? <div className={s.radioButtonInnerCircle} /> : null}
      </div>
    );
  }

  return (
    <div className={s.block}>
      <p className={s.title} style={{ marginBottom: 24 }}>
        {t("signup_title")}
      </p>
      <div className={s.userRoles}>
        <div
          className={isInvestor() ? s.userRoleActive : s.userRole}
          onClick={() => {
            setUserRole(UserRoles.Investor);
          }}
        >
          <RadioButtonCircle selected={isInvestor()} />
          <Image
            src={"/profile/empty-list/future-payouts.svg"}
            alt={"investor account"}
            width={30}
            height={25}
          />
          <p>{t("signup_investor")}</p>
        </div>
        <div
          className={isInvestor() ? s.userRole : s.userRoleActive}
          onClick={() => {
            setUserRole(UserRoles.Artist);
          }}
        >
          <RadioButtonCircle selected={!isInvestor()} />
          <Image
            src={"/auth/artist.svg"}
            alt={"artist account"}
            width={31}
            height={30}
          />
          <p>{t("signup_artist")}</p>
        </div>
      </div>
      <Button
        title={t("create_account")}
        color={"main"}
        arrow={false}
        fullLength={true}
        action={() => {
          props.setRole(userRole);
          props.setStep(SignUpSteps.SignUp);
        }}
      />
    </div>
  );
}
