export class SettingsTanDataInterface {
  description: string;
  name: string;
  type: string;
  value: string;
}

export interface InitTanSmsInterface {
  currentBalance: string;
  plivoMinBalance: number;
  plivoAuthId: string;
  plivoAuthToken: string;
  smsFrom: string;
  tanUsePlivo: boolean | string;
  textForSms: string;
}

export interface SentTanSmsInterface {
  currentBalance: string;
  plivoMinBalance: string;
  plivoAuthId: string;
  plivoAuthToken: string;
  smsFrom: string;
  tanUsePlivo: string;
  textForSms: string;
}
