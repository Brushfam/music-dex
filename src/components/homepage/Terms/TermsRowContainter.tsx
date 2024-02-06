import React from "react";
import s from "@/components/homepage/Terms/Terms.module.scss";

export function TermsRowContainer(props: { children: React.ReactNode }) {
    return (
        <div
            className={s.rowContainer}
        >
            {props.children}
        </div>
    );
}