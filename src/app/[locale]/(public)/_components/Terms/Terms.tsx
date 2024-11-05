import { ColumnContainer } from "@/components/ui/Containers/Containers";
import { GreyBlock } from "@/components/ui/GreyBlock/GreyBlock";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import s from "./Terms.module.scss";

function TermsRowContainer(props: { children: React.ReactNode }) {
  return <div className={s.rowContainer}>{props.children}</div>;
}

export function Terms() {
  const t = useTranslations("Home.Terms");

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
            <GreyBlock borderRadius={16} padding={0}>
              <div className={s.terms_block}>
                <Image
                  src={"/icons/portfolio.svg"}
                  alt={"portfolio"}
                  width={52}
                  height={52}
                />
              </div>
            </GreyBlock>
            <p>{t("first")}</p>
          </ColumnContainer>
        </TermsRowContainer>
        <TermsRowContainer>
          <ColumnContainer>
            <GreyBlock borderRadius={16} padding={0}>
              <div className={s.terms_block}>
                <Image
                  src={"/icons/calendar.svg"}
                  alt={"calendar"}
                  width={52}
                  height={52}
                />
              </div>
            </GreyBlock>
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
            style={{ marginTop: 70 }}
          />
          <ColumnContainer>
            <GreyBlock borderRadius={16} padding={0}>
              <div className={s.terms_block}>
                <Image
                  src={"/icons/tokens.svg"}
                  alt={"tokens"}
                  width={52}
                  height={52}
                />
              </div>
            </GreyBlock>
            <p>{t("thirds")}</p>
          </ColumnContainer>
        </TermsRowContainer>
        <TermsRowContainer>
          <ColumnContainer>
            <GreyBlock borderRadius={16} padding={0}>
              <div className={s.terms_block}>
                <Image
                  src={"/icons/shield.svg"}
                  alt={"shield"}
                  width={52}
                  height={54}
                />
              </div>
            </GreyBlock>
            <p>{t("fourth")}</p>
          </ColumnContainer>
          <Image
            src={"/icons/curved-arrow.svg"}
            alt={"curved arrow"}
            width={180}
            height={80}
            style={{ rotate: "180deg", marginTop: 70 }}
            className={s.arrows}
          />
        </TermsRowContainer>
      </TermsRowContainer>
    </div>
  );
}
