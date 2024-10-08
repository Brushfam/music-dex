import Image from "next/image";
import { ReactNode } from "react";
import s from "./Auth.module.scss";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={s.authLayout}>
      <div className={s.blockWrapper}>
        <Image
          src={"/auth/orange-logo.png"}
          alt={"MusicDex logo"}
          width={48}
          height={47}
          style={{ marginBottom: 10 }}
        />
        {children}
      </div>
    </div>
  );
}
