"use client";
import ms from "../Modals.module.scss";
import s from "./ArtistModal.module.scss";
import { Button } from "@/components/ui/Button/Button";
import React, { useEffect } from "react";
import { FormStep } from "@/components/modals/ArtistModal/FormStep";
import { useTranslations } from "next-intl";
import { UseUser } from "@/context/UserContext";

export function ArtistModal() {
  const userContext = UseUser();
  const t = useTranslations("ArtistModal");

  useEffect(() => {
    if (typeof window !== "undefined") {
      let formStep = window.localStorage.getItem("user-artist-modal");
      if (!formStep) {
        userContext.setArtistFormStep("1");
      }
    }
  }, [userContext]);

  function FirstStep() {
    return (
      <div className={s.artistModal}>
        <p className={s.title}>{t("title")}</p>
        <div className={s.content}>
          <p className={s.formDescription}>{t("description")}</p>
        </div>
        <div className={s.buttonRow}>
          <Button
            title={t("close")}
            color={"grey"}
            arrow={false}
            action={() => {
              userContext.setArtistFormStep("0");
            }}
          />
          <Button
            title={t("open")}
            color={"main"}
            arrow={true}
            action={() => {
              userContext.setArtistFormStep("2");
            }}
          />
        </div>
      </div>
    );
  }

  function CurrentStep() {
    if (userContext.artistFormStep == "1") {
      return <FirstStep />;
    } else if (userContext.artistFormStep == "2") {
      return <FormStep />;
    }
    return null;
  }

  function isClosed() {
    return (
      userContext.artistFormStep === "0" || userContext.artistFormStep === ""
    );
  }

  return isClosed() ? null : (
    <div className={ms.overlay}>
      <CurrentStep />
    </div>
  );
}
