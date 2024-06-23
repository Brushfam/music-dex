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
        <p className={s.content}>{t("content1")}</p>
        <p className={s.content}>{t("content2")}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 15,
          }}
        >
          <Button
            title={t("close")}
            color={"grey"}
            arrow={false}
            action={() => {
              props.setModal("");
            }}
          />
          <a
            href={props.orderUrl}
            target={"_blank"}
            className={s.linkButton}
            onClick={() => {
              props.setModal("");
            }}
          >
            <p>{t("ok")}</p>
          </a>
        </div>
      </div>
    </div>
  );
}
