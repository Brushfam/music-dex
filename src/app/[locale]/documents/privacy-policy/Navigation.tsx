import { privacyPolicyNavigation } from "@/data/documents/privacy-policy/privacyPolicyNavigation";
import s from "../documents.module.css";

export default function Navigation() {
  return (
    <div className={s.NavigationWrapper}>
      {privacyPolicyNavigation &&
        privacyPolicyNavigation.map((item, i) => {
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
