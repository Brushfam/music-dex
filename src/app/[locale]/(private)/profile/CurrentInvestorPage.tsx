import { ProfilePages } from "@/types/types";
import Songs from "@/app/[locale]/(private)/profile/_investor/Songs";
import Settings from "@/app/[locale]/(private)/profile/_investor/Profile";
import {Overview} from "@/app/[locale]/(private)/profile/_investor/Overview";
import {Royalties} from "@/app/[locale]/(private)/profile/_investor/Royalties";

export function CurrentInvestorPage(props: { currentPage: ProfilePages }) {
  switch (props.currentPage) {
    case ProfilePages.Overview:
      return <Overview />;
    case ProfilePages.Songs:
      return <Songs />;
    case ProfilePages.Royalties:
      return <Royalties />;
    case ProfilePages.Activities:
      return <Songs />;
    case ProfilePages.Settings:
      return <Settings />;
    default:
      return <Songs />;
  }
}
