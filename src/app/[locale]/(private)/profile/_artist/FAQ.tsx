"use client";

import { useTranslations } from "next-intl";
import React from "react";
import s from "../_artist/faq/FaqList.module.scss"
import {PageWrapper} from "@/app/[locale]/(private)/profile/PageWrapper";
import {FaqList} from "@/app/[locale]/(private)/profile/_artist/faq/FaqList";

export function FAQ() {
    const t = useTranslations("ProfileArtist.FAQ");

    return (
        <PageWrapper title={t("title")} height={"auto"} loading={false}>
            <p className={s.subpageTitle}>Answers to Frequently Asked Questions</p>
            <FaqList/>
        </PageWrapper>
    );
}