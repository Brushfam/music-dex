"use client"

import { Button } from "@/components/ui/Button/Button";
import { handleDonatePixelEvent } from "@/services/pixel";
import { useTranslations } from "next-intl";
import s from "./Donate.module.scss";

export function Donate(props: { donateLink: string; artist: string }) {
  const t = useTranslations("SharesBlock");

  return (
    <div className={s.donate}>
      <p className={s.title}>{t("donate")}</p>
      <div
        onClick={() => {
          handleDonatePixelEvent(props.artist);
        }}
      >
        <Button
          title={t("donate_crypto")}
          color={"transparent"}
          arrow={true}
          fullLength={true}
          path={props.donateLink}
          target={"_blank"}
        />
      </div>
    </div>
  );
}
