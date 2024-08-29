import { useTranslations } from "next-intl";
import s from "./Footer.module.scss";
import {createSharedPathnamesNavigation} from "next-intl/navigation";

export function Legal() {
    const { Link: LocalLink } = createSharedPathnamesNavigation({
        locales: ["en", "uk"],
    });
    const t = useTranslations("Footer");

    return (
        <div className={s.linksColumn}>
            <p style={{ marginBottom: 6 }}>{t("legal")}</p>
            <LocalLink href={"/documents/privacy-policy"}>
                {t("privacy_policy")}
            </LocalLink>
            <LocalLink href={"/documents/terms-and-conditions"}>
                {t("terms")}
            </LocalLink>
            <LocalLink href={"/documents/public-offer"}>
                {t("public_offer")}
            </LocalLink>
        </div>
    );
}
