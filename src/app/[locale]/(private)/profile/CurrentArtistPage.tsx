import { ProfilePages } from "@/types/types";
import Profile from "@/app/[locale]/(private)/profile/_artist/Profile";
import { Songs } from "@/app/[locale]/(private)/profile/_artist/Songs";
import { Overview } from "@/app/[locale]/(private)/profile/_artist/Overview";
import {FAQ} from "@/app/[locale]/(private)/profile/_artist/FAQ";

export function CurrentArtistPage(props: { currentPage: ProfilePages }) {
  switch (props.currentPage) {
    case ProfilePages.Overview:
      return <Overview />;
    case ProfilePages.Songs:
      return <Songs />;
    case ProfilePages.Settings:
      return <Profile />;
    case ProfilePages.FAQ:
      return <FAQ />;
    default:
      return <Overview />;
  }
}
