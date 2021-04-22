import { ICountry } from '@interfaces/country.interface';

export interface BankDetailsInterface {
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
}
