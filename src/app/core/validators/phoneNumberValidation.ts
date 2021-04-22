import { parsePhoneNumber } from 'libphonenumber-js';
import { ICountryPhone } from '@interfaces/country.interface';
import { COUNTRIES } from '@constants/countries';

export function parseSmsPhoneNumber(smsPhoneNumber: string): { dialCode: string, smsNumber: string, country: ICountryPhone } | null {
  const countries: ICountryPhone[] = COUNTRIES;
  const phoneNumber = smsPhoneNumber ? parsePhoneNumber(smsPhoneNumber) : null;

  if (!smsPhoneNumber) {
    return null;
  }

  const selCountry = countries.find((country: ICountryPhone) => country.code === phoneNumber.country);

  return {
    dialCode: selCountry.dial_code,
    smsNumber: smsPhoneNumber.replace(selCountry.dial_code, ''),
    country: selCountry,
  };
}

export const phoneNumberMask = ['+', /[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, '-',
  /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

export const phoneMaskWithSymbol = ['+', /[1-9]/, /\S/, /\S/, /\S/, /\S/, /\S/, /\S/, /\S/, /\S/, /\S/, /\S/, /\S/, /\S/, /\S/ ];
