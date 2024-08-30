"use client";

import Image from "next/image";
import { useLocale } from "use-intl";
import s from "./BlogList.module.scss";

type BlogPostProps = {
  blog_date: string;
  blog_image: string;
  blog_link: string;
  title_en: string;
  title_uk: string;
};

export function BlogList(props: { blog: BlogPostProps[] }) {
  const locale = useLocale();

  return (
    <div className={s.blogList}>
      {props.blog.map((post, index) => {
        const title = locale === "en" ? post.title_en : post.title_uk;
        return (
          <a
            key={index.toString()}
            className={s.post}
            href={post.blog_link}
            target={"_blank"}
          >
            <img className={s.post_image} alt={title} src={post.blog_image} />
            <div className={s.post_text}>
              <p className={s.post_date}>{post.blog_date}</p>
              <p className={s.post_title}>{title}</p>
              <Image
                src={"/icons/arrow-link.svg"}
                alt={"arrow"}
                width={12}
                height={12}
                style={{
                  transform: "rotate(45deg)",
                  position: "absolute",
                  right: 16,
                  bottom: 24,
                }}
              />
            </div>
          </a>
        );
      })}
    </div>
  );
}
