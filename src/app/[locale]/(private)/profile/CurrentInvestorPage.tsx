import Activities from "@/app/[locale]/(private)/profile/_investor/Activities";
import { NFTs } from "@/app/[locale]/(private)/profile/_investor/NFTs";
import { Overview } from "@/app/[locale]/(private)/profile/_investor/Overview";
import Settings from "@/app/[locale]/(private)/profile/_investor/Profile";
import { Royalties } from "@/app/[locale]/(private)/profile/_investor/Royalties";
import { ProfilePages } from "@/types/types";
import { Balance } from "./_investor/Balance";

export function CurrentInvestorPage(props: { currentPage: ProfilePages }) {
  switch (props.currentPage) {
    case ProfilePages.Overview:
      return <Overview />;
    case ProfilePages.Royalties:
      return <Royalties />;
    case ProfilePages.Activities:
      return <Activities />;
    case ProfilePages.NFTs:
      return <NFTs />;
    case ProfilePages.Settings:
      return <Settings />;
    case ProfilePages.BALANCE:
      return <Balance />;
    default:
      return <Overview />;
  }
}
