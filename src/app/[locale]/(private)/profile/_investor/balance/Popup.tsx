import { useBalanceStore } from "@/store/balance";
import { FC, PropsWithChildren } from "react";
import styles from "./Balance.module.scss";

interface Popup extends PropsWithChildren {
  title: string;
}

export const Popup: FC<Popup> = ({ title, children }) => {
  const { setTopUpStep } = useBalanceStore();
  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        e.stopPropagation();
        setTopUpStep(null);
      }}
    >
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};
