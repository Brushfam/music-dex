import s from "./Starknet.module.scss";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function StarknetSection() {
  const t = useTranslations("Home");

  return (
    <div className={s.section}>
      <p className={s.title}>{t("built_on")}</p>
      <a
        className={s.logoContainer}
        href={"https://www.starknet.io/en/"}
        target={"_blank"}
      >
        <Image src={"/logos/SN-logo.svg"} alt={"Starknet"} fill={true} />
      </a>
      <p className={s.description}>{t("starknet_description")}</p>
    </div>
  );
}
