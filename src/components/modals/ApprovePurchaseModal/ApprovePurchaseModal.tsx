import ms from "../Modals.module.scss";
import s from "./ApprovePurchaseModal.module.scss";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button/Button";
import React from "react";

export function ApprovePurchaseModal(props: {
  orderUrl: string;
  setModal: React.Dispatch<React.SetStateAction<string>>;
}) {
  const t = useTranslations("SharesBlock.ApprovePurchaseModal");

  return (
    <div className={ms.overlay}>
      <div className={s.approvePurchaseModal}>
        <p className={s.title}>{t("title")}</p>
        <p className={s.content}>{t("content")}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            title={"Close"}
            color={"main"}
            arrow={false}
            action={() => {
              props.setModal("");
            }}
          />
          <a href={props.orderUrl} className={s.linkButton}>
            <p>Open link</p>
          </a>
        </div>
      </div>
    </div>
  );
}
