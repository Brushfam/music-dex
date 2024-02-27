
import s from "../documents.module.css";
import {termsNavigation} from "@/data/documents/terms-and-conditions/termsNavigation";

export default function Navigation() {
  return (
      <div className={s.NavigationWrapper}>
        <p className={s.navigationText} style={{ cursor: "auto" }}>
            MusicDex terms and conditions
        </p>
        {termsNavigation &&
            termsNavigation.map((item, i) => {
            return (
              <a
                key={i.toString()}
                href={"#point" + (i + 1).toString()}
                className={s.navigationText}
              >
                <div>
                  {i + 1}. {item.point}
                </div>
              </a>
            );
          })}
      </div>
  );
}
