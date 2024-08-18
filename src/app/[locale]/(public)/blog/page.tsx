import { useTranslations } from "next-intl";
import Image from "next/image";
import s from "./Blog.module.scss";

export default function Blog() {
  const t = useTranslations("Blog");

  return (
    <div className={s.blog}>
      <div className={s.centeredWrapper}>
        <div className={s.blogTitleBlock}>
          <p className={s.blogTitleBlock_title}>{t("title")}</p>
          <p className={s.description}>{t("description")}</p>
        </div>
      </div>
      <div className={s.centeredWrapper}>
        <div className={s.emptyBlog}>
          <Image
            src={"/for-artist/get.svg"}
            alt={"empty blog"}
            width={50}
            height={50}
          />
          <p className={s.emptyBlog_description}>{t("empty_blog")}</p>
        </div>
      </div>
    </div>
  );
}
