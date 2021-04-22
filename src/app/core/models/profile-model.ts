import { mergeSnackKeysProperties } from '@helpers/stringHelpers';
import { UserGroup } from '@models/user-group-model';

class CompanyDetails {
  companyName: string;
  companyRole: string;
  companyType: string;
  directorFirstName: string;
  directorLastName: string;
}

class AddressModel {
  address: string;
  addressSecondLine: string;
  city: string;
  countryIsoTwo: string;
  description?: string;
  id?: number;
  latitud?: string;
  longitude?: string;
  name?: string;
  phoneNumber?: string;
  region: string;
  zipCode: string;
}

export class ProfileModel {
  public uid?: string;
  attributes?: {};
  avatarFileId?: string;
  blockedUntil?: string;
  challengeName: string;
  classId: 0;
  companyDetails?: CompanyDetails;
  companyID?: string;
  countryOfCitizenshipIsoTwo?: string;
  countryOfResidenceIsoTwo?: string;
  createdAt: string;
  dateOfBirth?: string;
  documentPersonalId: string;
  documentType: string;
  email: string;
  fax: string;
  firstName: string;
  homePhoneNumber: string;
  internalNotes: string;
  isCorporate?: boolean;
  lastActedAct?: string;
  lastLoginAt: string;
  lastLoginIp: string;
  lastName: string;
  maAsPhysical?: boolean;
  mailingAddresses?: AddressModel[];
  middleName: string;
  nickname?: string;
  officePhoneNumber: string;
  parentId: string;
  phoneNumber: string;
  physicalAddresses: AddressModel[];
  position: string;
  roleName: string;
  smsPhoneNumber: string;
  status: string;
  updatedAt: string;
  userGroup: UserGroup;
  userGroupId: string;
  username: string;
  youtubeChannelId?: string;
  password?: string;
  previousPassword?: string;
  confirmPassword?: string;

  public  constructor(params: object) {
    mergeSnackKeysProperties(this, params);

    if (this.maAsPhysical) {
      this.mailingAddresses = this.physicalAddresses;
    }
  }

  public static getBlockedSortFields(): string[] {
    return ['username', '-username', 'first_name', '-first_name', 'last_name', '-last_name', 'email', '-email', '-created_at'];
  }
}
