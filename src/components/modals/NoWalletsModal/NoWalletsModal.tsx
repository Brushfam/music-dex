"use client";

import { Button } from "@/components/ui/Button/Button";
import { useUserStore } from "@/store/user";
import { useTranslations } from "next-intl";
import { useLocale } from "use-intl";
import s from "../Modals.module.scss";

export function NoWalletsModal() {
  const t = useTranslations("SharesBlock.NoWalletsModal");
  const currentLocale = useLocale();
  const noWalletsModal = useUserStore((state) => state.noWalletsModal);
  const setNoWalletsModal = useUserStore((state) => state.setNoWalletsModal);

  console.log(noWalletsModal);
  
  return noWalletsModal ? (
    <div className={s.overlay}>
      <div className={s.baseModal}>
        <p className={s.title}>{t("title")}</p>
        <p className={s.content}>{t("content")}</p>
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
              setNoWalletsModal("");
            }}
          />
          <a
            href={"/" + currentLocale + "/profile"}
            className={s.linkButton}
            onClick={() => {
              setNoWalletsModal("");
            }}
          >
            <p>{t("ok")}</p>
          </a>
        </div>
      </div>
    </div>
  ) : null;
}
