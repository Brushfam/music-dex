import { BlogList } from "@/app/[locale]/(public)/blog/_components/BlogList";
import { useTranslations } from "next-intl";
import s from "./Blog.module.scss";
import { EmptyBlog } from '@/app/[locale]/(public)/blog/_components/EmptyBlog';
import { getBlog } from '@/services/blog';

function BlogTitle() {
  const t = useTranslations("Blog");
  return (
    <div className={s.centeredWrapper}>
      <div className={s.blogTitleBlock}>
        <p className={s.blogTitleBlock_title}>{t("title")}</p>
        <p className={s.description}>{t("description")}</p>
      </div>
    </div>
  );
}

export default async function Blog() {
  const response = await getBlog();

  return (
    <div className={s.blog}>
      <BlogTitle />
      {!response.data.blog.length ? (
        <EmptyBlog />
      ) : (
        <BlogList blog={response.data.blog} />
      )}
    </div>
  );
}
