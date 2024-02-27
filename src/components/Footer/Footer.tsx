import s from "./Footer.module.scss";
import Image from "next/image";

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
        <p className={s.footerText}>
          Invest in Music Royalties and Shape the Future of Music
        </p>
      </div>
      <div className={s.linksBlockWrapper}>
          <div className={s.footerLinksBlock}>
              <a href={"/documents/privacy-policy"}>Privacy Policy</a>
              <a href={"/documents/terms-and-conditions"}>Terms and Conditions</a>
              <div className={s.emailBlock}>
                  <p>Email:</p>
                  <a
                      href={"mailto:markian@musicdex.co"}
                      style={{color: "white", cursor: "pointer"}}
                  >
                      markian@musicdex.co
                  </a>
              </div>
          </div>
      </div>
    </div>
  );
}
