import s from "./Terms.module.scss";
import {
  ColumnContainer,
  RowContainer,
} from "@/components/ui/Containers/Containers";
import Image from "next/image";

export function Terms() {
  return (
    <div className={s.terms}>
      <RowContainer gap={100}>
        <RowContainer gap={40}>
          <Image
            src={"/icons/curved-arrow.svg"}
            alt={"curved arrow"}
            width={180}
            height={80}
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
            <p>Minimum investment amounts</p>
          </ColumnContainer>
        </RowContainer>
        <RowContainer gap={40}>
          <ColumnContainer>
            <div className={s.terms_block}>
              <Image
                src={"/icons/calendar.svg"}
                alt={"calendar"}
                width={52}
                height={52}
              />
            </div>
            <p>Royalty distribution frequency</p>
          </ColumnContainer>
          <Image
            src={"/icons/curved-arrow.svg"}
            alt={"curved arrow"}
            width={180}
            height={80}
            className={s.terms_mirrorx_img}
          />
        </RowContainer>
      </RowContainer>
      <RowContainer gap={100}>
        <RowContainer gap={40}>
          <Image
            src={"/icons/curved-arrow.svg"}
            alt={"curved arrow"}
            width={180}
            height={80}
            className={s.terms_mirrory_img}
            style={{marginTop: 69}}
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
            <p>Token redemption options</p>
          </ColumnContainer>
        </RowContainer>
        <RowContainer gap={40}>
          <ColumnContainer>
            <div className={s.terms_block}>
              <Image
                src={"/icons/shield.svg"}
                alt={"shield"}
                width={52}
                height={54}
              />
            </div>
            <p>Investor protection measures</p>
          </ColumnContainer>
          <Image
            src={"/icons/curved-arrow.svg"}
            alt={"curved arrow"}
            width={180}
            height={80}
            style={{rotate: "180deg", marginTop: 69}}
          />
        </RowContainer>
      </RowContainer>
    </div>
  );
}
