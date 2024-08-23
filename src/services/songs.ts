import axios from "axios";

export function getCatalog() {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/songs");
}

export function getSongMainData(slug: string) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/songs/" + slug);
}

export function getSongAvailableTokens(slug: string) {
  return axios.get(
    process.env.NEXT_PUBLIC_SERVER_URL + "/songs/" + slug + "/available-amount"
  );
}

export function getSongOverview(slug: string) {
  return axios.get(
    process.env.NEXT_PUBLIC_SERVER_URL + "/songs/" + slug + "/overview"
  );
}

export function getSongRoyalties(slug: string) {
  return axios.get(
    process.env.NEXT_PUBLIC_SERVER_URL + "/songs/" + slug + "/royalties"
  );
}

export function getSongStreams(slug: string, platform: string) {
  return axios.get(
    process.env.NEXT_PUBLIC_SERVER_URL +
      "/songs/" +
      slug +
      "/listening/" +
      platform,
    {}
  );
}

export function getSongAboutArtist(slug: string) {
  return axios.get(
    process.env.NEXT_PUBLIC_SERVER_URL + "/songs/" + slug + "/about-artist"
  );
}
