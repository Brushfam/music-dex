import s from "@/app/[locale]/(public)/blog/Blog.module.scss";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function EmptyBlog() {
  const t = useTranslations("Blog");
  return (
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
  );
}
