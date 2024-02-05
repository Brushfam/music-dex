import s from "./Albums.module.scss";
import {AlbumCard} from "@/components/homepage/AlbumCard/AlbumCard";

export function Albums() {
    return(
        <div className={s.albumsWrapper}>
            <div className={s.albums} style={{marginTop: 90}}>
                <AlbumCard image={"/albums/album1.png"} title={"Києве мій"} author={"Tony Tonite"}/>
                <AlbumCard image={"/albums/album2.png"} title={"og 044"} author={"Tony Tonite"}/>
                <AlbumCard image={"/albums/album3.png"} title={"Позивний ТТ"} author={"Tony Tonite"}/>
                <AlbumCard image={"/albums/album4.png"} title={"Українське сонце"} author={"Tony Tonite feat. Yarmak"}/>
                <AlbumCard image={"/albums/album1.png"} title={"Києве мій"} author={"Tony Tonite"}/>
            </div>
            <div className={s.albums} style={{marginBottom: 20}}>
                <AlbumCard image={"/albums/album3.png"} title={"Позивний ТТ"} author={"Tony Tonite"}/>
                <AlbumCard image={"/albums/album4.png"} title={"Українське сонце"} author={"Tony Tonite feat. Yarmak"}/>
                <AlbumCard image={"/albums/album1.png"} title={"Києве мій"} author={"Tony Tonite"}/>
                <AlbumCard image={"/albums/album2.png"} title={"og 044"} author={"Tony Tonite"}/>
                <AlbumCard image={"/albums/album3.png"} title={"Позивний ТТ"} author={"Tony Tonite"}/>
            </div>
        </div>
    )
}