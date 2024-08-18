import Activities from "@/app/[locale]/(private)/profile/_investor/Activities";
import { NFTs } from "@/app/[locale]/(private)/profile/_investor/NFTs";
import { Overview } from "@/app/[locale]/(private)/profile/_investor/Overview";
import Settings from "@/app/[locale]/(private)/profile/_investor/Profile";
import { Royalties } from "@/app/[locale]/(private)/profile/_investor/Royalties";
import Songs from "@/app/[locale]/(private)/profile/_investor/Songs";
import { ProfilePages } from "@/types/types";

export function CurrentInvestorPage(props: { currentPage: ProfilePages }) {
  switch (props.currentPage) {
    case ProfilePages.Overview:
      return <Overview />;
    case ProfilePages.Songs:
      return <Songs />;
    case ProfilePages.Royalties:
      return <Royalties />;
    case ProfilePages.Activities:
      return <Activities />;
    case ProfilePages.NFTs:
      return <NFTs />;
    case ProfilePages.Settings:
      return <Settings />;
    default:
      return <Songs />;
  }
}
