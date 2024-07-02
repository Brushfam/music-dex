import s from "./ReachOut.module.scss";
import {ReachOutForm} from "@/app/[locale]/(public)/for-artist/_components/ReachOutForm";

export function ReachOut() {
  return (
    <div className={s.reachOutSection}>
      <div className={s.textWrapper}>
        <p className={s.title}>Interested in working with us? </p>
        <p className={s.description}>
          Reach out to us and we will send you a value proposition
        </p>
      </div>
        <ReachOutForm/>
    </div>
  );
}
