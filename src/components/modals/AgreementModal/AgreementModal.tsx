"use client";

import ms from "../Modals.module.scss";
import s from "./AgreementModal.module.scss";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { signAgreement } from "@/services/unipass-server";
import { UseUser } from "@/context/UserContext";
import {
  introductionEN,
  introductionUA,
  pointsEN,
  pointsUA,
} from "@/data/documents/public-offer/publicOfferContent";
import { useTranslations } from "next-intl";
import { useLocale } from "use-intl";
import { toast } from "sonner";
import { Checkbox } from "@mui/material";

export function AgreementModal(props: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const userContext = UseUser();
  const currentLocale = useLocale();

  const [introduction, points] =
    currentLocale === "uk"
      ? [introductionUA, pointsUA]
      : [introductionEN, pointsEN];
  const t = useTranslations("AgreementModal");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  async function handleSignAgreement() {
    setLoading(true);
    signAgreement(userContext.currentUser)
      .then(() => {
        userContext.setHasAgreement("true");
        toast.success(t("toaster.sign_success"));
        setLoading(false);
        props.setModal(false);
      })
      .catch((e) => {
        toast.error(t("toaster.sign_error"));
        console.log(e);
        props.setModal(false);
      });
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisabled(!event.target.checked);
  };

  function AgreementCheckbox() {
    return (
      <div style={{display: "flex"}}>
        <div className={s.checkboxBlock}>
          <Checkbox
            checked={!disabled}
            sx={{
              color: "rgb(246, 96, 31)",
              "&.Mui-checked": {
                color: "rgb(246, 96, 31)",
              },
            }}
            size={"small"}
            onChange={handleCheckboxChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <p>{t("checkbox")}</p>
        </div>
      </div>
    );
  }

  function LoadingButton() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button title={t("loading_button")} color={"loading"} arrow={false} />
      </div>
    );
  }

  function ButtonsRow() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          title={t("close")}
          color={"grey"}
          arrow={false}
          action={() => {
            props.setModal(false);
          }}
        />
        <Button
          title={t("accept")}
          color={disabled ? "loading" : "main"}
          arrow={false}
          action={async () => {
            if (!disabled) {
              await handleSignAgreement();
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className={ms.overlay}>
      <div className={s.agreementModal}>
        <div className={s.textBlock}>
          <p className={s.headerText}>{t("agreement_title")}</p>
          <div className={s.point}>
            {introduction.map((item, i) => {
              return (
                <div key={i.toString()} className={s.pointText}>
                  {item.text}
                </div>
              );
            })}
          </div>
          {points.map((item, itemNumber) => {
            return (
              <div
                key={itemNumber.toString()}
                className={s.point}
                id={"point" + (itemNumber + 1).toString()}
              >
                <div className={s.pointTitle}>{item.title}</div>
                {item.point &&
                  item.point.map((paragraph, textNumber) => {
                    return (
                      <div key={textNumber.toString()} className={s.pointText}>
                        {paragraph.text}
                      </div>
                    );
                  })}
              </div>
            );
          })}
          <AgreementCheckbox />
        </div>
        <div className={s.dividerBlock}>
          <div className={s.shadowElement} />
        </div>
        {loading ? <LoadingButton /> : <ButtonsRow />}
      </div>
    </div>
  );
}
