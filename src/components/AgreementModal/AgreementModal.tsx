"use client";

import s from "./AgreementModal.module.scss";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { signAgreement, unipassSignMessage } from "@/services/unipass";
import { UseUser } from "@/context/UserContext";
import { unipassVerifySignature } from "@/services/unipass-server";
import {
  introductionEN,
  pointsEN,
} from "@/data/documents/public-offer/publicOfferContent";

export function AgreementModal(props: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const userContext = UseUser();
  const [loadingMessage, setLoadingMessage] = useState("");

  async function handleSignAgreement() {
    setLoadingMessage("Signing...");
    let sig = await unipassSignMessage("test");
    if (!sig) {
      return;
    }

    setLoadingMessage("Saving...");
    await unipassVerifySignature("test", sig, userContext.currentUser);
    await signAgreement(userContext.currentUser);

    userContext.setHasAgreement("true");
    setLoadingMessage("");
    props.setModal(false);
  }

  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <div className={s.textBlock}>
          <p className={s.headerText}>PUBLIC OFFER AGREEMENT</p>
          <div className={s.point}>
            {introductionEN.map((item, i) => {
              return (
                <div key={i.toString()} className={s.pointText}>
                  {item.text}
                </div>
              );
            })}
          </div>
          {pointsEN.map((item, itemNumber) => {
            return (
              <div
                key={itemNumber.toString()}
                className={s.point}
                id={"point" + (itemNumber + 1).toString()}
              >
                <div className={s.pointTitle}>{item.title}</div>
                {item.point &&
                  item.point.map((paragraph, textNumber) => {
                    return (
                      <div key={textNumber.toString()} className={s.pointText}>
                        {paragraph.text}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
        <div className={s.dividerBlock}>
          <div className={s.shadowElement} />
        </div>
        {loadingMessage.length ? (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button title={loadingMessage} color={"loading"} arrow={false} />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              title={"Close"}
              color={"grey"}
              arrow={false}
              action={() => {
                props.setModal(false);
              }}
            />
            <Button
              title={"Accept"}
              color={"main"}
              arrow={false}
              action={async () => {
                await handleSignAgreement();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
