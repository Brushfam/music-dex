import { Catalog } from "@/app/[locale]/(public)/songs/Catalog";
import FaqSection from "@/components/Faq/FaqSection/FaqSection";
import { Section } from "@/components/ui/Section/Section";
import { getCatalog } from "@/services/songs";
import { useTranslations } from "next-intl";
import cs from "../../../commonStyles.module.scss";
import s from "./page.module.scss";

async function fetchCatalogData() {
  try {
    const res = await getCatalog();
    return res.data.catalog;
  } catch (error) {
    console.error("Error fetching catalog:", error);
    return null;
  }
}

function TitleBlock() {
  const t = useTranslations("Catalog");
  return (
    <div className={s.titleBlock}>
      <h2>{t("header")}</h2>
      <p>{t("description")}</p>
    </div>
  );
}

export default async function CatalogPage() {
  const catalog = await fetchCatalogData();

  return (
    <div className={cs.main}>
      <div className={s.catalogPageWrapper}>
        <Section>
          <TitleBlock />
          <Catalog catalog={catalog} />
        </Section>
      </div>
      <FaqSection />
    </div>
  );
}
