import s from './Button.module.scss'
import Image from "next/image";

export function Button(props: {title: string, color: string, path: string}) {
    return <a href={props.path} className={props.color === "red" ? s.buttonDiv_red : s.buttonDiv_grey} style={{backgroundColor: props.color}}>
        <p>{props.title}</p>
        <Image src={"/icons/button-arrow.svg"} alt={"arrow"} width={16} height={16}/>
    </a>
}