import { ProfilePages } from "@/types/types";
import Profile from "@/app/[locale]/(private)/profile/_artist/Profile";

export function CurrentArtistPage(props: { currentPage: ProfilePages }) {
  switch (props.currentPage) {
    case ProfilePages.Overview:
      return <Profile />;
    case ProfilePages.Songs:
      return <Profile />;
    case ProfilePages.Settings:
      return <Profile />;
    default:
      return <Profile />;
  }
}
