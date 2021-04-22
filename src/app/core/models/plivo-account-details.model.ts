export class PlivoAccountDetailsModel {
  accountType: string;
  address: string;
  apiId: string;
  authId: string;
  autoRecharge: boolean;
  billingMode: string;
  cashCredits: string;
  city: string;
  name: string;
  resourceUri: string;
  state: string;
  timezone: string;

  constructor(params: object) {
    Object.assign(this, params);
  }
}
