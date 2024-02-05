import { Block } from "@/components/ui/Block/Block";
import s from './AlbumCard.module.scss'

export function AlbumCard(props: {image: string, title: string, author: string}) {
    return <Block>
        <div className={s.albumCard}>
            <img src={props.image} alt={props.title}/>
            <p className={s.title}>{props.title}</p>
            <p className={s.author}>{props.author}</p>
        </div>
    </Block>
}