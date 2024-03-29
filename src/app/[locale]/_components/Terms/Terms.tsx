import s from "./Terms.module.scss";
import { ColumnContainer } from "@/components/ui/Containers/Containers";
import Image from "next/image";
import React from "react";
import {useTranslations} from "next-intl";

export function Terms() {
  const t = useTranslations("Home.Terms");

  function TermsRowContainer(props: { children: React.ReactNode }) {
    return <div className={s.rowContainer}>{props.children}</div>;
  }

  return (
    <div className={s.terms}>
      <TermsRowContainer>
        <TermsRowContainer>
          <Image
            src={"/icons/curved-arrow.svg"}
            alt={"curved arrow"}
            width={180}
            height={80}
            className={s.arrows}
          />
          <ColumnContainer>
            <div className={s.terms_block}>
              <Image
                src={"/icons/portfolio.svg"}
                alt={"portfolio"}
                width={52}
                height={52}
              />
            </div>
            <p>{t("first")}</p>
          </ColumnContainer>
        </TermsRowContainer>
        <TermsRowContainer>
          <ColumnContainer>
            <div className={s.terms_block}>
              <Image
                src={"/icons/calendar.svg"}
                alt={"calendar"}
                width={52}
                height={52}
              />
            </div>
            <p>{t("second")}</p>
          </ColumnContainer>
          <Image
            src={"/icons/curved-arrow.svg"}
            alt={"curved arrow"}
            width={180}
            height={80}
            className={s.terms_mirrorx_img}
          />
        </TermsRowContainer>
      </TermsRowContainer>
      <TermsRowContainer>
        <TermsRowContainer>
          <Image
            src={"/icons/curved-arrow.svg"}
            alt={"curved arrow"}
            width={180}
            height={80}
            className={s.terms_mirrory_img}
            style={{ marginTop: 69 }}
          />
          <ColumnContainer>
            <div className={s.terms_block}>
              <Image
                src={"/icons/tokens.svg"}
                alt={"tokens"}
                width={52}
                height={52}
              />
            </div>
            <p>{t("thirds")}</p>
          </ColumnContainer>
        </TermsRowContainer>
        <TermsRowContainer>
          <ColumnContainer>
            <div className={s.terms_block}>
              <Image
                src={"/icons/shield.svg"}
                alt={"shield"}
                width={52}
                height={54}
              />
            </div>
            <p>{t("fourth")}</p>
          </ColumnContainer>
          <Image
            src={"/icons/curved-arrow.svg"}
            alt={"curved arrow"}
            width={180}
            height={80}
            style={{ rotate: "180deg", marginTop: 69 }}
            className={s.arrows}
          />
        </TermsRowContainer>
      </TermsRowContainer>
    </div>
  );
}
