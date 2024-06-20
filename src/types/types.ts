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
  Settings
}
