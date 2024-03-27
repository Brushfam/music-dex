import {adminList} from "@/data/adminList";

// DATA PROCESSING
export function getTrackOwnerData(address: string) {
  let trackOwnerData = "";
  for (let i = 0; i < adminList.length; ++i) {
    if (address === adminList[i].address) {
      trackOwnerData = JSON.stringify(adminList[i]);
    }
  }
  return trackOwnerData;
}

// MATH FUNCTIONS
export function roundToTwo(n: number) {
  return Math.round(n * 100) / 100;
}
