import s from "./Footer.module.scss";
import { socialMediaData } from "@/data/socialMediaData";

export function SocialMedia() {
  return (
    <div className={s.linksColumn}>
      <p style={{ marginBottom: 6 }}>Social Media</p>
      <div className={s.mediaWrapper}>
        {socialMediaData.map((media, index) => {
          return (
            <a href={media.link} target="_blank" key={index.toString()}>
              <div className={s.mediaDesktop}>
                {media.desktopImage}
                <p>{media.name}</p>
              </div>
              <div className={s.mediaMobile}>{media.mobileImage}</div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
