"use client";

import cs from "@/app/commonStyles.module.scss";
import { useState } from "react";
import { AdminModal } from "@/components/Header/modals/AdminModal";

export function AdminMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <div
        className={cs.headerButton}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {open ? <p>Close</p> : <p>Admin menu</p>}
      </div>
      {open ? <AdminModal /> : <></>}
    </div>
  );
}
