import { ProfilePages } from "@/types/types";
import Songs from "@/app/[locale]/(private)/profile/_investor/Songs";
import Settings from "@/app/[locale]/(private)/profile/_investor/Profile";

export function CurrentInvestorPage(props: { currentPage: ProfilePages }) {
  switch (props.currentPage) {
    case ProfilePages.Overview:
      return <Songs />;
    case ProfilePages.Songs:
      return <Songs />;
    case ProfilePages.Royalties:
      return <Songs />;
    case ProfilePages.Activities:
      return <Songs />;
    case ProfilePages.Settings:
      return <Settings />;
    default:
      return <Songs />;
  }
}
