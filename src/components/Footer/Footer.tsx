import s from "./Footer.module.scss";
import Image from "next/image";
import {SocialMedia} from "@/components/Footer/SocialMedia";

export function Footer() {
  return (
    <div className={s.footerSection} id={"footer"}>
      <div className={s.columnContainer}>
        <Image
          alt={"logo"}
          src={"/logos/MusicDex-logo.svg"}
          width={200}
          height={43}
        />
        <p className={s.footerMainText}>
          Invest in Music Royalties and Shape the Future of Music
        </p>
      </div>
      <div className={s.linksBlock}>
        <SocialMedia/>
        <div className={s.linksColumn}>
          <p style={{ marginBottom: 6 }}>Email</p>
          <a href={"mailto:markian@musicdex.co"} target="_blank">markian@musicdex.co</a>
        </div>
        <div className={s.linksColumn}>
          <p style={{marginBottom: 6}}>Other</p>
          <a href={"/documents/privacy-policy"}>Privacy Policy</a>
          <a href={"/documents/terms-and-conditions"}>Terms and Conditions</a>
          <a href={"/documents/public-offer"}>Public Offer</a>
        </div>
      </div>
    </div>
  );
}
