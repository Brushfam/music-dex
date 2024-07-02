"use client";
import s from "./ReachOut.module.scss";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button/Button";
import { useForm } from "@formspree/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function ReachOutForm() {
  const t = useTranslations("ArtistModal");
  const [state, handleSubmit] = useForm("xdknoeqk");

  useEffect(() => {
    if (state.errors?.kind) {
      toast.error(t("error"));
    }
    if (state.succeeded) {
      toast.success("Submitted!");
    }
  }, [state.errors, state.succeeded, t]);

  return (
    <form className={s.artistForm} onSubmit={handleSubmit}>
      <div className={s.artistFormContent}>
        <label htmlFor={"topic"}>{t("FormFields.name")}</label>
        <input
          id={"topic"}
          type={"text"}
          name={"topic"}
          placeholder={"Write a topic for your inquiry"}
          autoComplete="off"
          autoCorrect={"off"}
          spellCheck={"false"}
          className={s.formInput}
          required
        />
        <label htmlFor={"name"}>{t("FormFields.social")}</label>
        <input
          id={"name"}
          type={"text"}
          name={"name"}
          placeholder={"Enter your name"}
          autoComplete="off"
          autoCorrect={"off"}
          spellCheck={"false"}
          className={s.formInput}
          required
        />
        <label htmlFor={"email"}>{t("FormFields.email")}</label>
        <input
          type={"email"}
          name={"email"}
          id={"email"}
          placeholder={"Enter your email"}
          autoComplete="off"
          autoCorrect={"off"}
          spellCheck={"false"}
          className={s.formInput}
          required
        />
        <label htmlFor={"message"}>{t("FormFields.tracks")}</label>
        <textarea
          name={"message"}
          id={"message"}
          autoComplete="off"
          autoCorrect={"off"}
          spellCheck={"false"}
          className={s.lastInput}
          required
        />
      </div>
      <div className={s.buttonRow}>
        <Button
          title={state.succeeded ? "Submitted" : t("send")}
          color={state.submitting || state.succeeded ? "loading" : "main"}
          arrow={false}
          type={"submit"}
        />
      </div>
    </form>
  );
}
