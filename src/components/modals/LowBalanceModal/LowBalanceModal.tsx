import ms from "../Modals.module.scss";
import s from "./LowBalanceModal.module.scss";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button/Button";
import React from "react";

export function LowBalanceModal(props: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  wallet: string;
}) {
  const t = useTranslations("SharesBlock.LowBalanceModal");

  function ModalContent() {
    return props.wallet === "Unipass" ? (
      <p className={s.content}>
        {t("unipass")}{" "}
        <a href={"https://wallet.unipass.id/"} target={"_blank"}>
          wallet.unipass.id
        </a>
        .
      </p>
    ) : (
      <p className={s.content}>{t("wallet_connect")}</p>
    );
  }

  return (
    <div className={ms.overlay}>
      <div className={s.lowBalanceModal}>
        <p className={s.title}>{t("title")}</p>
        <ModalContent />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Button
            title={t("ok")}
            color={"main"}
            arrow={false}
            action={() => {
              props.setModal(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
