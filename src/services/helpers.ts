import {ownersList} from "@/data/ownersList";

export function getTrackOwnerData(address: string) {
  let trackOwnerData = "";
  for (let i = 0; i < ownersList.length; ++i) {
    if (address === ownersList[i].address) {
      trackOwnerData = JSON.stringify(ownersList[i]);
    }
  }
  return trackOwnerData;
}
