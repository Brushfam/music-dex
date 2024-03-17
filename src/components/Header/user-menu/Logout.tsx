"use client";

import cs from "@/app/commonStyles.module.scss";
import { unipassLogout } from "@/services/unipass";
import { UseUser } from "@/context/UserContext";

export function LogoutButton() {
  let userContext = UseUser();

  function handleOnClick() {
    let res = unipassLogout();
    res
      .then(() => {
        userContext.logout();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div
      className={cs.headerButton}
      onClick={() => {
        handleOnClick();
      }}
    >
      <p>Log out</p>
    </div>
  );
}
