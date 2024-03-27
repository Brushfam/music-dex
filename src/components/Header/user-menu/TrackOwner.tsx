"use client";

import cs from "@/app/commonStyles.module.scss";
import { useState } from "react";
import { TrackOwnerModal } from "@/components/Header/modals/TrackOwnerModal";
import { useTranslations } from "next-intl";
import { UseUser } from "@/context/UserContext";
import s from "@/components/Header/Header.module.scss";
import Image from "next/image";

export function TrackOwner() {
  const t = useTranslations("Header");
  const userContext = UseUser();
  const [open, setOpen] = useState(false);

  return userContext.trackOwner ? (
    <div style={{ position: "relative" }}>
      <button
        type={"button"}
        className={cs.headerButton}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {open ? (
          <div className={s.mediaWrapper}>
            <p>{t("close")}</p>
            <Image
              src={"/icons/header/arrow.svg"}
              alt={"arrow"}
              width={18}
              height={10}
            />
          </div>
        ) : (
          <div className={s.mediaWrapper}>
            <p>{t("my_track")}</p>
            <Image
              src={"/icons/labels/genre.svg"}
              alt={"arrow"}
              width={16}
              height={16}
            />
          </div>
        )}
      </button>
      {open ? (
        <TrackOwnerModal trackOwnerData={JSON.parse(userContext.trackOwner)} />
      ) : null}
    </div>
  ) : null;
}
