import s from './Roadmap.module.scss'

export function Roadmap() {
    return <div className={s.roadmap}>
        <img src={"/roadmap.svg"} alt={"roadmap"}/>
    </div>
}