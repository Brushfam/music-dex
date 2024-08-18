"use client";

import { Button } from "@/components/ui/Button/Button";
import { useUserStore } from "@/store/user";
import { useTranslations } from "next-intl";
import s from "../Modals.module.scss";

export function ApprovePurchaseModal() {
  const t = useTranslations("SharesBlock.ApprovePurchaseModal");
  const orderLink = useUserStore((state) => state.orderLink);
  const setOrderLink = useUserStore((state) => state.setOrderLink);

  return orderLink ? (
    <div className={s.overlay}>
      <div className={s.baseModal}>
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
