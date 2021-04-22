class Address {
  private prefix;

  public zipPostalCode?: string;
  public stateProvRegion?: string;
  public phoneNumber: string;
  public name: string;
  public countryIso2: string;
  public city: string;
  public address: string;
  public address2ndLine: string;

  public constructor(data: object, prefix: string) {
    this.prefix = prefix;
    Object.keys(data).forEach((key) => {

    });
  }
}

export class CreateProfileRequest {
  public uid: string;
  public firstName: string;
  public lastName: string;
  public phoneNumber?: string;
  public companyName: string;
  public email: string;
  public username: string;
  public roleName: string;
  public status: string;
  public password: string;
  public confirmPassword: string;
  public position: string;
  public isCorporate: boolean;
  public dateOfBirthYear?: number;
  public dateOfBirthMonth?: number;
  public dateOfBirthDay?: number;
  public documentType?: string;
  public documentPersonalId?: string;
  public countryOfResidenceIso2?: string;
  public countryOfCitizenshipIso2?: string;
  public classId: number;
  public internalNotes?: string;
  public homePhoneNumber?: string;
  public officePhoneNumber?: string;
  public fax?: string;
  public userGroupId: string;

  public boFullName?: string;
  public boPhoneNumber?: string;
  public smsPhoneNumber?: string;
  public boDateOfBirthYear?: string;
  public boDateOfBirthMonth?: string;
  public boDateOfBirthDay?: string;
  public boDocumentPersonalId?: string;
  public boDocumentType?: string;
  public boAddress?: string;
  public boRelationship?: string;

  public paZipPostalCode?: string;
  public paAddress?: string;
  public paAddress2ndLine?: string;
  public paCity?: string;
  public paCountryIso2?: string;
  public paStateProvRegion?: string;

  public maAsPhysical?: boolean;
  public maZipPostalCode?: string;
  public maStateProvRegion?: string;
  public maPhoneNumber?: string;
  public maName?: string;
  public maCountryIso2?: string;
  public maCity?: string;
  public maAddress?: string;
  public maAddress2ndLine?: string;

  public pecuniaCardId?: string;
  public expirationYear?: string;
  public expirationMonth?: number;

  constructor(data: object) {
    Object.assign(this, data);
    if (this.maAsPhysical) {
      this.maZipPostalCode = this.paZipPostalCode;
      this.maStateProvRegion = this.paStateProvRegion;
      this.maCountryIso2 = this.paCountryIso2;
      this.maCity = this.paCity;
      this.maAddress = this.paAddress;
      this.maAddress2ndLine = this.paAddress2ndLine;
    }
  }
}
