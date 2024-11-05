import { BrushfamLogo } from "@/app/[locale]/(public)/_components/Partners/BrushfamLogo";
import { WhitepayLogo } from "@/app/[locale]/(public)/_components/Partners/WhitepayLogo";
import { useTranslations } from "next-intl";
import Link from "next/link";
import s from "./Partners.module.scss";
import { StarknetLogo } from "./StarknetLogo";

function Slashes() {
  return <div className={s.slashes}>{"/////"}</div>;
}

export function Partners() {
  const t = useTranslations("Home");

  return (
    <div className={s.section}>
      <p className={s.title}>{t("partners")}</p>
      <div className={""}>
        <div className={s.carousel}>
          <div className={`${s.group} ${s.toLeft}`}>
            <Slashes />
            <Link href={"https://brushfam.io/"} target={"_blank"}>
              <BrushfamLogo />
            </Link>
            <Slashes />
            <Link href={"https://whitepay.com/"} target={"_blank"}>
              <WhitepayLogo />
            </Link>
            <Slashes />
            <Link href={"https://incrypted.com/en/"} target={"_blank"}>
              <img src="/for-artist/ncrypto.png" alt="" />
            </Link>
            <Slashes />
            <Link href={"https://www.starknet.io/"}>
              <StarknetLogo />
            </Link>
          </div>
          <div aria-hidden className={`${s.group} ${s.toLeft}`}>
            <Slashes />
            <Link href={"https://brushfam.io/"} target={"_blank"}>
              <BrushfamLogo />
            </Link>
            <Slashes />
            <Link href={"https://whitepay.com/"} target={"_blank"}>
              <WhitepayLogo />
            </Link>
            <Slashes />
            <Link href={"https://incrypted.com/en/"} target={"_blank"}>
              <img src="/for-artist/ncrypto.png" alt="" />
            </Link>
            <Slashes />
            <Link href={"https://www.starknet.io/"}>
              <StarknetLogo />
            </Link>
          </div>
        </div>
        <div className={s.carousel}>
          <div aria-hidden className={`${s.group} ${s.toRight}`}>
            <Link href={"https://incrypted.com/en/"} target={"_blank"}>
              <img src="/for-artist/ncrypto.png" alt="" />
            </Link>
            <Slashes />
            <Link href={"https://www.starknet.io/"}>
              <StarknetLogo />
            </Link>
            <Slashes />
            <Link href={"https://brushfam.io/"} target={"_blank"}>
              <BrushfamLogo />
            </Link>
            <Slashes />
            <Link href={"https://whitepay.com/"} target={"_blank"}>
              <WhitepayLogo />
            </Link>
            <Slashes />
          </div>
          <div className={`${s.group} ${s.toRight}`}>
            <Link href={"https://incrypted.com/en/"} target={"_blank"}>
              <img src="/for-artist/ncrypto.png" alt="" />
            </Link>
            <Slashes />
            <Link href={"https://www.starknet.io/"}>
              <StarknetLogo />
            </Link>
            <Slashes />
            <Link href={"https://brushfam.io/"} target={"_blank"}>
              <BrushfamLogo />
            </Link>
            <Slashes />
            <Link href={"https://whitepay.com/"} target={"_blank"}>
              <WhitepayLogo />
            </Link>
            <Slashes />
          </div>
        </div>
      </div>
    </div>
  );
}
