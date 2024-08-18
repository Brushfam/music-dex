"use client";
import { Button } from "@/components/ui/Button/Button";
import { useForm } from "@formspree/react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { toast } from "sonner";
import s from "./ReachOut.module.scss";

export function ReachOutForm() {
  const t = useTranslations("ForArtist.Form");
  const [state, handleSubmit] = useForm("xdknoeqk");

  useEffect(() => {
    if (state.errors?.kind) {
      toast.error(t("error"));
    }
    if (state.succeeded) {
      toast.success(t("submitted"));
    }
  }, [state.errors, state.succeeded, t]);

  return (
    <form className={s.artistForm} onSubmit={handleSubmit}>
      <div className={s.artistFormContent}>
        <label htmlFor={"topic"}>{t("topic")}</label>
        <input
          id={"topic"}
          type={"text"}
          name={"topic"}
          placeholder={t("topic_placeholder")}
          autoComplete="off"
          autoCorrect={"off"}
          spellCheck={"false"}
          className={s.formInput}
          required
        />
        <label htmlFor={"name"}>{t("name")}</label>
        <input
          id={"name"}
          type={"text"}
          name={"name"}
          placeholder={t("name_placeholder")}
          autoComplete="off"
          autoCorrect={"off"}
          spellCheck={"false"}
          className={s.formInput}
          required
        />
        <label htmlFor={"email"}>{t("email")}</label>
        <input
          type={"email"}
          name={"email"}
          id={"email"}
          placeholder={t("email_placeholder")}
          autoComplete="off"
          autoCorrect={"off"}
          spellCheck={"false"}
          className={s.formInput}
          required
        />
        <label htmlFor={"message"}>{t("message")}</label>
        <textarea
          name={"message"}
          id={"message"}
          placeholder={t("message_placeholder")}
          autoComplete="off"
          autoCorrect={"off"}
          spellCheck={"false"}
          className={s.lastInput}
          required
        />
      </div>
      <div className={s.buttonRow}>
        <Button
          title={state.succeeded ? t("sent") : t("send")}
          color={state.submitting || state.succeeded ? "loading" : "main"}
          arrow={false}
          type={"submit"}
        />
      </div>
    </form>
  );
}
