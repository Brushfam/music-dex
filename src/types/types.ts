export type trackDataType = {
  rights_holder: string;
  price: number;
  details: { type: string; value: string }[];
  description?: string;
};

export type trackOwnerType = {
  address: string;
  track: string;
  tokenAddress: string;
};

export type faqNavigationType = {
  title: string;
}[];

export type faqContentType = {
  question: string;
  answer: string;
}[];

export enum SignUpSteps {
  SignUp,
  EmailSent,
  EmailIsNotVerified,
}

export enum LoginSteps {
  Login,
  ResetPassword,
  EmailSent,
}

export enum ProfilePages {
  Overview,
  Songs,
  Royalties,
  Activities,
  Settings,
  FAQ
}

export interface InvestorInfo {
  firstName: string;
  lastName: string;
  favGenre: string;
  country: string;
  profiles: string[]; // tiktok, instagram, twitter
}

export interface ArtistInfo {
  firstName: string;
  lastName: string;
  artistName: string;
  country: string;
}

export interface Wallet {
  address: string;
  name: string;
}

export enum ActivitiesStatus {
  WAITING= "Waiting",
  COMPLETE= "Complete",
  "DECLINED"= "Declined"
}
