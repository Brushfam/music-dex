import { privacyPolicyNavigation } from "@/data/documents/privacy-policy/privacyPolicyNavigation";
import s from "../documents.module.css";

export default function Navigation() {
  return (
      <div className={s.NavigationWrapper}>
        <p className={s.navigationTitle}>CONTENT</p>
        <p className={s.navigationText} style={{ cursor: "auto" }}>
            MusicDex privacy policy
        </p>
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
