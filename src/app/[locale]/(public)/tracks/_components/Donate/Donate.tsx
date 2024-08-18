import { Button } from "@/components/ui/Button/Button";
import { useTranslations } from "next-intl";
import s from "./Donate.module.scss";

export function Donate(props: { donateLink: string }) {
  const t = useTranslations("SharesBlock");

  return (
    <div className={s.donate}>
      <p className={s.title}>{t("donate")}</p>
      <Button
        title={t("donate_crypto")}
        color={"transparent"}
        arrow={true}
        fullLength={true}
        path={props.donateLink}
        target={"_blank"}
      />
    </div>
  );
}
