export enum OptionsPrefixes {
  USER_OPTIONS_FIELD_USER = 'profile/user-options/field_user_',
  USER_OPTIONS_DORMANT = 'profile/user-options/',
  SYSTEM_CONFIG_GENERAL = 'regional/general/',
  SYSTEM_CONFIG_MODULES = 'regional/modules/',
  SYSTEM_CONFIG_LOGIN_SECURITY = 'regional/login/failed_login_',
  PROFILE_AUTO_LOGOUT = 'profile/autologout/',
  TEMP_MODULES_PREFIX = 'temp/modules/' //  todo remove after on/off modules
}

export enum OptionsPaths {
  REGIONAL_GENERAL = 'regional/general',
  REGIONAL_MODULES = 'regional/modules',
  REGIONAL_LOGIN = 'regional/login',
  USER_OPTIONS = 'profile/user-options',
  AUTO_LOGOUT = 'profile/autologout',
  TEMP_MODULES = 'temp/modules', //  todo remove after on/off modules
}

export const pathOptionsPrefixes: Map<OptionsPaths, OptionsPrefixes> = new Map(
  [[OptionsPaths.REGIONAL_GENERAL, OptionsPrefixes.SYSTEM_CONFIG_GENERAL],
    [OptionsPaths.REGIONAL_MODULES, OptionsPrefixes.SYSTEM_CONFIG_MODULES],
    [OptionsPaths.REGIONAL_LOGIN, OptionsPrefixes.SYSTEM_CONFIG_LOGIN_SECURITY],
    [OptionsPaths.USER_OPTIONS, OptionsPrefixes.USER_OPTIONS_FIELD_USER],
    [OptionsPaths.AUTO_LOGOUT, OptionsPrefixes.PROFILE_AUTO_LOGOUT],
    [OptionsPaths.TEMP_MODULES, OptionsPrefixes.TEMP_MODULES_PREFIX]] //  todo CHECK after on/off modules
);

export enum optionsValuesNames {
  SITE_URL = 'siteUrl',
  DEFAULT_TIMEZONE = 'defaultTimezone',
  DEFAULT_DATE_FORMAT = 'defaultDateFormat',
  DEFAULT_TIME_FORMAT = 'defaultTimeFormat',
  SITE_NAME = 'siteName',
  USER_REGISTER = 'userRegister',
  MAINTENANCE = 'maintenance',
  MAINTENANCE_TEXT = 'maintenanceText',
  CARD_MODULE = 'velmieWalletCards',
  GDPR_MODULE = 'velmieWalletGdpr',
  MITEK_MODULE = 'mtajiMitek',
  SPIRITS_MODULE = 'mtajiSpirits',
  USERNAME_USE = 'usernameUse',
  USERNAME_LIMIT = 'usernameLimit',
  USERNAME_CLEANUP = 'usernameCleanup',
  IP_LIMIT_ATTEMPTS = 'userUse',
  IP_LIMIT_CLEANUP = 'userWindow',
  AUTO_LOGOUT_STATUS = 'status',
  AUTO_LOGOUT_TIMEOUT = 'timeout',
  AUTO_LOGOUT_MESSAGE = 'message',
  AUTO_LOGOUT_INACTIVITY_MESSAGE = 'inactivityMessage',
  AUTO_LOGOUT_PADDING = 'padding',
  TOTAL_USER_FILES_STORAGE_LIMIT_MB = 'totalUserFilesStorageLimitMb',
  USER_FILE_SIZE_LIMIT_MB = 'userFileSizeLimitMb'

}

export enum userOptionNames {
  EMAIL = 'email',
  BENEFICIAL_OWNER = 'beneficialOwner',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  MIDDLE_NAME = 'middleName',
  COMPANY_NAME = 'companyName',
  COMPANY_TYPE = 'companyType',
  COMPANY_ROLE = 'companyRole',
  DIRECTOR_FIRST_NAME = 'directorFirstName',
  DIRECTOR_LAST_NAME = 'directorLastName',
  DATE_OF_BIRTH = 'dateOfBirth',
  DOCUMENT_NUMBER = 'documentPersonalId',
  COUNTRY_OF_RESIDENCE = 'countryOfResidenceIso2',
  COUNTRY_OF_CITIZENSHIP = 'countryOfCitizenshipIso2',
  OFFICE_PHONE = 'officePhoneNumber',
  HOME_PHONE = 'homePhoneNumber',
  PHONE_NUMBER = 'phoneNumber',
  SMS_PHONE_NUMBER = 'smsPhoneNumber',
  FAX = 'fax',
  PHYSICAL_ADDRESS = 'paAddress',
  PHYSICAL_ADDRESS_SECOND_LINE = 'paAddress2ndLine',
  PHYSICAL_ADDRESS_CITY = 'paCity',
  PHYSICAL_ADDRESS_COUNTRY = 'paCountryIso2',
  PHYSICAL_ADDRESS_REGION = 'paStateProvRegion',
  PHYSICAL_ADDRESS_ZIP_CODE = 'paZipPostalCode',
  MAILING_ADDRESS_AS_PHYSICAL = 'maAsPhysical',
  MAILING_ADDRESS_NAME = 'maName',
  MAILING_ADDRESS = 'maAddress',
  MAILING_ADDRESS_CITY = 'maCity',
  MAILING_ADDRESS_SECOND_LINE = 'maAddress2ndLine',
  MAILING_ADDRESS_REGION = 'maStateProvRegion',
  MAILING_ADDRESS_ZIP_CODE = 'maZipPostalCode',
  MAILING_ADDRESS_PHONE_NUMBER = 'maPhoneNumber',
  MAILING_ADDRESS_COUNTRY = 'maCountryIso2',
  BENEFICIAL_OWNER_FULL_NAME = 'boFullName',
  BENEFICIAL_OWNER_DATE_OF_BIRTH = 'boDateOfBirth',
  BENEFICIAL_OWNER_PERSONAL_DOCUMENT = 'boDocumentPersonalId',
  BENEFICIAL_OWNER_RELATIONSHIP = 'boRelationship',
  BENEFICIAL_OWNER_ADDRESS = 'boAddress',
  BENEFICIAL_OWNER_PHONE_NUMBER = 'boPhoneNumber',
}

export const optionsValuesPaths: Map<optionsValuesNames, OptionsPaths> = new Map(
  [
    [optionsValuesNames.SITE_URL, OptionsPaths.REGIONAL_GENERAL],
    [optionsValuesNames.DEFAULT_TIMEZONE, OptionsPaths.REGIONAL_GENERAL],
    [optionsValuesNames.DEFAULT_DATE_FORMAT, OptionsPaths.REGIONAL_GENERAL],
    [optionsValuesNames.DEFAULT_TIME_FORMAT, OptionsPaths.REGIONAL_GENERAL],
    [optionsValuesNames.SITE_NAME, OptionsPaths.REGIONAL_GENERAL],
    [optionsValuesNames.USER_REGISTER, OptionsPaths.REGIONAL_GENERAL],
    [optionsValuesNames.MAINTENANCE, OptionsPaths.REGIONAL_GENERAL],
    [optionsValuesNames.MAINTENANCE_TEXT, OptionsPaths.REGIONAL_GENERAL],
    [optionsValuesNames.CARD_MODULE, OptionsPaths.REGIONAL_MODULES],
    [optionsValuesNames.GDPR_MODULE, OptionsPaths.REGIONAL_MODULES],
    [optionsValuesNames.MITEK_MODULE, OptionsPaths.TEMP_MODULES], //  todo change after on/off modules
    [optionsValuesNames.SPIRITS_MODULE, OptionsPaths.TEMP_MODULES], //  todo change after on/off modules
    [optionsValuesNames.USERNAME_USE, OptionsPaths.REGIONAL_LOGIN],
    [optionsValuesNames.USERNAME_LIMIT, OptionsPaths.REGIONAL_LOGIN],
    [optionsValuesNames.USERNAME_CLEANUP, OptionsPaths.REGIONAL_LOGIN],
    [optionsValuesNames.IP_LIMIT_ATTEMPTS, OptionsPaths.REGIONAL_LOGIN],
    [optionsValuesNames.IP_LIMIT_CLEANUP, OptionsPaths.REGIONAL_LOGIN],
    [optionsValuesNames.AUTO_LOGOUT_STATUS, OptionsPaths.AUTO_LOGOUT],
    [optionsValuesNames.AUTO_LOGOUT_TIMEOUT, OptionsPaths.AUTO_LOGOUT],
    [optionsValuesNames.AUTO_LOGOUT_MESSAGE, OptionsPaths.AUTO_LOGOUT],
    [optionsValuesNames.AUTO_LOGOUT_INACTIVITY_MESSAGE, OptionsPaths.AUTO_LOGOUT],
    [optionsValuesNames.AUTO_LOGOUT_PADDING, OptionsPaths.AUTO_LOGOUT],

  ]
);

export const publicPaths: OptionsPaths[] = [OptionsPaths.REGIONAL_GENERAL, OptionsPaths.AUTO_LOGOUT];
