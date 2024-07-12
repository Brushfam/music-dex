"use client";

import ms from "../Modals.module.scss";
import s from "./ApprovePurchaseModal.module.scss";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button/Button";
import React from "react";
import { useUserStore } from "@/store/user";

export function ApprovePurchaseModal() {
  const t = useTranslations("SharesBlock.ApprovePurchaseModal");
  const orderLink = useUserStore((state) => state.orderLink);
  const setOrderLink = useUserStore((state) => state.setOrderLink);

  return orderLink ? (
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
              setOrderLink("");
            }}
          />
          <a
            href={orderLink}
            target={"_blank"}
            className={s.linkButton}
            onClick={() => {
              setOrderLink("");
            }}
          >
            <p>{t("ok")}</p>
          </a>
        </div>
      </div>
    </div>
  ) : null;
}
