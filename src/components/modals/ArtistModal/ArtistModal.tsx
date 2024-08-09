"use client";

import ms from "../Modals.module.scss";
import s from "./ArtistModal.module.scss";
import { Button } from "@/components/ui/Button/Button";
import React, { useEffect } from "react";
import { FormStep } from "@/components/modals/ArtistModal/FormStep";
import { useTranslations } from "next-intl";
import { useArtistFormStore } from "@/store/artistForm";

export function ArtistModal() {
  const currentStep = useArtistFormStore((state) => state.artistFormStep);
  const changeStep = useArtistFormStore((state) => state.setArtistFormStep);
  const t = useTranslations("ArtistModal");

  useEffect(() => {
    function checkAndSetStep(formStepObject: string | null) {
      if (!formStepObject) {
        changeStep("1");
        return;
      }
      let formStep = JSON.parse(formStepObject);
      if (!formStep.state.artistFormStep) {
        changeStep("1");
      }
    }

    if (typeof window !== "undefined") {
      let formStepObject = window.localStorage.getItem("artist-form-step");
      checkAndSetStep(formStepObject);
    }
  }, [changeStep]);

  function FirstStep() {
    return (
      <div className={s.artistSuggestionModal}>
        <p>{t("title")}</p>
        <div className={s.artistSuggestionModal_buttons}>
          <Button
            title={t("close")}
            color={"grey"}
            arrow={false}
            action={() => {
              changeStep("0");
            }}
          />
          <Button
            title={t("open")}
            color={"main"}
            arrow={true}
            action={() => {
              changeStep("2");
            }}
          />
        </div>
      </div>
    );
  }

  function SecondStep() {
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
              changeStep("0");
            }}
          />
          <Button
            title={t("open_form")}
            color={"main"}
            arrow={true}
            action={() => {
              changeStep("3");
            }}
          />
        </div>
      </div>
    );
  }

  function CurrentStep() {
    if (currentStep == "1") {
      return <FirstStep />;
    } else if (currentStep == "2") {
      return (
        <div className={ms.overlay}>
          <SecondStep />
        </div>
      );
    } else if (currentStep == "3") {
      return (
        <div className={ms.overlay}>
          <FormStep />;
        </div>
      );
    } else {
      changeStep("0");
      return null;
    }
  }

  function isClosed() {
    return currentStep === "0" || currentStep === "";
  }

  return isClosed() ? null : <CurrentStep />;
}
