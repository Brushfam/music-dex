import { Section } from "@/components/ui/Section/Section";
import {
  ColumnContainer
} from "@/components/ui/Containers/Containers";
import s from "./Footer.module.scss";
import Image from "next/image";

export function Footer() {
  return (
    <Section id={"footer"}>
      <ColumnContainer>
        <Image
          alt={"logo"}
          src={"/logos/MusicDex-logo.svg"}
          width={200}
          height={43}
        />
        <p className={s.footerText}>
          Invest in Music Royalties and Shape the Future of Music
        </p>
      </ColumnContainer>
      <div style={{ position: "relative", height: "100%" }}>
        <p style={{ position: "absolute", bottom: 0, right: 0 }}>
          Email: <span style={{ color: "white" }}>markian@musicdex.co</span>
        </p>
      </div>
    </Section>
  );
}
