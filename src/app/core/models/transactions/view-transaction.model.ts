import { AccountInterface } from '@interfaces/account-interface';

export class ViewTransactionModel {

  public id: number;
  public description: string;
  public amount: string;
  public purpose: string;
  public createdAt: string;
  public statusChangedAt: string;
  public updatedAt: string;
  public requestData: RequestDataInterface;
  public recipient: ViewAccountProfileInterface;
  public sender: ViewAccountProfileInterface;
  public requestSubject: string;
  public status: string;
  public accountId: number;
  public currencyCode: string;
  public account: AccountInterface;
  public requestId: string;
  public showRequestId: boolean;
  public balanceSnapshot: number;
  public type: string;

  public constructor(params: any) {
    Object.assign(this, params);
  }
}

export interface ViewAccountProfileInterface {
  account: ViewTransactionAccount;
  profile: ViewTransactionProfile;
}

interface ViewTransactionAccount {
  currencyCode: string;
  number: string;
  typeName: string;
}

interface ViewTransactionProfile {
  companyName: string;
  firstName: string;
  lastName: string;
}

export interface RequestDataInterface {
  refMessage: string;
  bankDetails: BankDetailsInterface;
  beneficiaryCustomer: {
    accountName: string;
    address: string;
    createdAt: string;
    iban: string;
    id: number;
    updatedAt: string;
  };
  intermediaryBankDetails: BankDetailsInterface;
  destinationCurrencyCode: string;
  requestId: number;
  sourceAccountId: number;
}

interface BankDetailsInterface {
  abaNumber: string;
  address: string;
  bankName: string;
  country: {
    code: string;
    code3: string;
    codeNumeric: string;
    id: number;
    name: string;
  };
  countryId: number;
  createdAt: string;
  iban: string;
  id: number;
  location: string;
  swiftCode: string;
  updatedAt: string;
}
