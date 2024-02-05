import s from './Block.module.scss'
import React from "react";

export function Block(props: {children: React.ReactNode}) {
    return <div className={s.block}>
        {props.children}
    </div>
}