import { Catalog } from "@/app/[locale]/(public)/catalog/_components/Catalog/Catalog";
import FaqSection from "@/components/Faq/FaqSection/FaqSection";
import { Section } from "@/components/ui/Section/Section";
import { useTranslations } from "next-intl";
import cs from "../../../commonStyles.module.scss";
import s from "./page.module.scss";

export default function CatalogPage() {
  const t = useTranslations("Catalog");

  return (
    <div className={cs.main}>
      <div className={s.catalogPageWrapper}>
        <Section>
          <div className={s.titleBlock}>
            <h2>{t("header")}</h2>
            <p>{t("description")}</p>
          </div>
          <Catalog />
        </Section>
      </div>
      <FaqSection />
    </div>
  );
}
