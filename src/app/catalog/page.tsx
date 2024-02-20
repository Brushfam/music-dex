import cs from "../commonStyles.module.scss";
import s from "./page.module.scss";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import Faq from "@/components/Faq/Faq";
import { Section } from "@/components/ui/Section/Section";
import { Catalog } from "@/app/catalog/components/Catalog/Catalog";

export default function CatalogPage() {
  return (
    <div className={cs.main}>
      <Header />
      <div className={s.catalogPageWrapper}>
        <Section id={"catalog"}>
          <div className={s.titleBlock}>
            <h2>Choose your track</h2>
            <p>Invest in Music Royalties and Shape the Future of Music</p>
          </div>
          <Catalog />
        </Section>
      </div>
      <Faq />
      <Footer />
    </div>
  );
}
