export interface IUserData {
  items: IUser[];
  limit: number;
  offset: number;
  page: number;
  total_page: number;
  total_record: number;
}

export interface IUser {

  uid: string;
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  roleName: string;
  ROLE_ADMIN: string;
  ROLE_ROOT: string;
  phoneNumber: string;
  status: string;
  userGroupId: number;

  createdAt: string;
  updatedAt: string;
  companyName: string;
  isCorporate: boolean;
  countryOfCitizenshipISO2: string;
  countryOfResidenceISO2: string;
  dateOfBirthDay: number;
  dateOfBirthMonth: number;
  dateOfBirthYear: number;
  documentPersonalId: string;
  documentType: {
    String: string,
    Valid: boolean,
  };

  paAddress: string;
  paAddress2ndLine: string;
  paCity: string;
  paCountryIso2: string;
  paStateProvRegion: string;
  paZipPostalCode: string;

  maAddress: string;
  maAddress2ndLine: string;
  maCity: string;
  maCountryISO2: string;
  maStateProvRegion: string;
  maZipPostalCode: string;

  user_field_values: any;
  userGroup: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };

  cancellation_reason: string;

  label: string;

  isAdmin(): boolean;
  getFullName(): string;
  humanId(): string;
}
