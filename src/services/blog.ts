import axios from 'axios';

export function getBlog() {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/blog");
}