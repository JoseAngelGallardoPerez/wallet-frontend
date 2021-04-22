import { ICountry } from '@interfaces/country.interface';
import { BankDetailsInterface } from '@interfaces/bank-details/bank-details.interface';

export class BankDetailsModel implements BankDetailsInterface {
  id: number;
  createdAt: string;
  updatedAt: string;
  swiftCode: string;
  bankName: string;
  address: string;
  location: string;
  country: ICountry;
  countryId: string;
  abaNumber: string;
  iban: string;

  public constructor(params: any) {
    Object.assign(this, params);
  }
}
