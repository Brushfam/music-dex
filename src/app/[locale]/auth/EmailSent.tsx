import s from "@/app/[locale]/auth/Auth.module.scss";
import { Button } from "@/components/ui/Button/Button";
import React from "react";
import { useTranslations } from "next-intl";

export function EmailSent(props: { comment: string }) {
  const t = useTranslations("Auth");

  return (
    <div className={s.block}>
      <p className={s.title} style={{ marginBottom: 12 }}>
        {t("email_sent")}
      </p>
      <p className={s.secondaryText} style={{ marginBottom: 24 }}>{props.comment}</p>
      <Button
        title={t("done")}
        color={"main"}
        arrow={false}
        path={"/"}
        fullLength={true}
      />
    </div>
  );
}
