import s from "@/app/[locale]/(private)/profile/_investor/nft/NFTs.module.scss";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function NoNFTsBlock() {
  const t = useTranslations("ProfileInvestor.NFTs");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Image
        src={"/profile/empty-list/payment-history.svg"}
        alt={"icon"}
        width={38}
        height={48}
      />
      <p className={s.noNftBlock_text1}>{t("empty_title")}</p>
      <p className={s.noNftBlock_text2}>{t("empty_desc")}</p>
    </div>
  );
}
