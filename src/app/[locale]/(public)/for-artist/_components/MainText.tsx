"use client";

import s from "@/app/[locale]/(public)/for-artist/ForArtist.module.scss";
import Image from "next/image";
import { useLocale } from "use-intl";

export function MainText() {
  const currentLocale = useLocale();

  function MainTextEN() {
    return (
      <div className={s.mainTextWrapper}>
        <div className={s.mainTextEN1}>
          <Image
            src={"/for-artist/text-en1.svg"}
            alt={"text"}
            width={1187}
            height={163}
          />
        </div>
        <div className={s.mainTextEN2}>
          <Image
            src={"/for-artist/text-en2.svg"}
            alt={"text"}
            width={774}
            height={367}
          />
        </div>
        <div className={s.mainTextEN3}>
          <Image
            src={"/for-artist/text-en3.svg"}
            alt={"text"}
            width={302}
            height={426}
          />
        </div>
      </div>
    );
  }

  function MainTextUK() {
    return (
      <div className={s.mainTextWrapper}>
        <div className={s.mainTextUK1}>
          <Image
            src={"/for-artist/text-uk1.svg"}
            alt={"text"}
            width={1187}
            height={163}
          />
        </div>
        <div className={s.mainTextUK2}>
          <Image
            src={"/for-artist/text-uk2.svg"}
            alt={"text"}
            width={774}
            height={367}
          />
        </div>
        <div className={s.mainTextUK3}>
          <Image
            src={"/for-artist/text-uk3.svg"}
            alt={"text"}
            width={301}
            height={426}
          />
        </div>
      </div>
    );
  }

  return currentLocale === "en" ? <MainTextEN /> : <MainTextUK />;
}
