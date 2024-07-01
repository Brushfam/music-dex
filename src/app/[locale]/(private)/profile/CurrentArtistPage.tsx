import { ProfilePages } from "@/types/types";
import Profile from "@/app/[locale]/(private)/profile/_artist/Profile";
import { Songs } from "@/app/[locale]/(private)/profile/_artist/Songs";
import { Overview } from "@/app/[locale]/(private)/profile/_artist/Overview";

export function CurrentArtistPage(props: { currentPage: ProfilePages }) {
  switch (props.currentPage) {
    case ProfilePages.Overview:
      return <Overview />;
    case ProfilePages.Songs:
      return <Songs />;
    case ProfilePages.Settings:
      return <Profile />;
    default:
      return <Overview />;
  }
}
