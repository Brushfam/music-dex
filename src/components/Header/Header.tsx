import s from './Header.module.scss'
import Link from "next/link";
import Image from "next/image";

export function Header() {
    return <div className={s.header}>
        <div className={s.header_content}>
            <Link href={"/"}>
                <Image alt={"logo"} src={"/logos/MusicDex-logo.svg"} width={141} height={32}/>
            </Link>
        </div>
    </div>
}