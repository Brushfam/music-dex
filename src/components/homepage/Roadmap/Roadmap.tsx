import s from './Roadmap.module.scss'
import {FlowList} from "@/components/homepage/FlowList/FlowList"
import {roadmapData} from "@/data/roadmapData";

export function Roadmap() {
    return <div className={s.roadmap}>
        <img src={"/roadmap.svg"} alt={"roadmap"}/>
        <div className={s.mobileRoadmap}>
            <FlowList listData={roadmapData} symbol={"Q"}/>
        </div>
    </div>
}