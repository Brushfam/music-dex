import s from "./Overview.module.scss"
import {Statistics} from "@/app/[locale]/(private)/profile/_investor/overview/Statistics";
import {PaymentHistory} from "@/app/[locale]/(private)/profile/_investor/overview/PaymentHistory";
import {SuggestedSongs} from "@/app/[locale]/(private)/profile/_investor/overview/SuggestedSongs";

export function SecondBlock() {
    return(<div className={s.secondOverviewRow}>
        <div style={{display: "flex", flexDirection: "column", gap: 16}}>
            <Statistics/>
            <PaymentHistory/>
        </div>
        <SuggestedSongs/>
    </div>)
}