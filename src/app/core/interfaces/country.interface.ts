export interface ICountry {
  id: number;
  name: string;
  code: string;
  code3: string;
  codeNumeric: string;
}

export interface ICountryPhone {
  name: string;
  dial_code: string;
  code: string;
  image: string;
}

export interface CountryFromApi {
  as: string;
  city: string;
  country: string;
  countryCode: string;
  isp: string;
  lat: number;
  lon: number;
  org: string;
  query: string;
  region: string;
  regionName: string;
  status: string;
  timezone: string;
  zip: string;
}

export interface ShortCountryInterface {
  code: string;
  name: string;
}
