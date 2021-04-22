import { IUser } from '@interfaces/user-interface';

/**
 * @deprecated
 */
export class UserModel {
  status: number;
  data: User[];
}

export class User implements IUser {
  uid: string;
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  roleName: string;
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

  ROLE_ADMIN = 'admin';
  ROLE_ROOT = 'root';

  public constructor(params: any) {
    (<any>Object).assign(this, params);
    this.label = `${this.firstName} ${this.lastName} (${this.email})`;
  }

  public isAdmin(): boolean {
    return this.roleName === this.ROLE_ADMIN || this.roleName === this.ROLE_ROOT;
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public humanId(): string {
    const fullName = `${this.firstName.trim()} ${this.lastName.trim()}`.trim();
    if (fullName) {
      return `${fullName} ( ${this.email} )`;
    }

    return this.email;
  }
}
