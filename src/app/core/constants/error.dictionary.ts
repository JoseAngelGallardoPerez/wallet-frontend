import { ErrorCodes } from '@app/core/constants/errorCodes';
import { UserPermissions } from '@constants/userPermissions';

export const ErrorDictionary: Map<ErrorCodes | string, string | Map<ErrorCodes | string, string>> =
  new Map<ErrorCodes | string, string | Map<ErrorCodes | string, string>>([
  /* Common validation error */
  [ErrorCodes.UNIQUE, 'Should be unique.'],
  [ErrorCodes.REQUIRED, 'Is required and cannot be empty.'],
  [ErrorCodes.CUSTOM_REQUIRED, `{{value}} field is required.`],
  [ErrorCodes.EMAIL, 'The e-mail address is not valid.'],
  [ErrorCodes.DECIMAL_VALIDATION, 'Should be decimal.'],
  [ErrorCodes.FILE_NOT_FOUND, 'Is not found.'],
  [ErrorCodes.FORBIDDEN, 'You are not allowed to perform this action.'],
  [ErrorCodes.NOT_POSITIVE_NUBER, 'Only positive numbers are allowed'],
  [ErrorCodes.NOT_UPPERCASE, 'Only latin uppercase letters are allowed'],
  [ErrorCodes.NOT_UPPERCASE_OR_NUMBER, 'Only uppercase and numbers are allowed'],

  /* Accounts service */
  [ErrorCodes.TAN_INVALID, 'Provided TAN is incorrect or has already been used.'],
  [ErrorCodes.TAN_EMPTY, 'The request was missing required header X-TAN which must include one time password called.'],
  [ErrorCodes.ACCOUNT_NOT_FOUND, 'The "Credit to" account does not exist or deposits are not allowed. '],
  [ErrorCodes.ACCOUNT_INACTIVE, 'The "Credit to" account does not exist or deposits are not allowed.'],
  [ErrorCodes.USER_NOT_FOUND, 'User was not found.'],
  [ErrorCodes.USER_INVALID_STATUS, 'The “Credit to” user has invalid status.'],
  [ErrorCodes.DUPLICATE_TRANSFER_TEMPLATE, 'Template with the same name and request subject is already exist.'],
  [ErrorCodes.UNCOVERED_TRANSFER_FEE, 'Transfer fee amount is greater than requested transfer amount.'],
  [ErrorCodes.WITHDRAWAL_NOT_ALLOWED, 'It is not allowed to perform withdrawals from this account.'],
  [ErrorCodes.DEPOSIT_NOT_ALLOWED, 'The "Credit to" account does not exist or deposits are not allowed.'],
  [ErrorCodes.INSUFFICIENT_FUNDS, 'Not enough available funds in the account.'],
  [ErrorCodes.DUPLICATE_TRANSFER_FEE, 'Transfer fee with the same name and request subject is already exist.'],
  [ErrorCodes.FEE_PARAMS_NOT_FOUND, 'Fee params not found'],
  [ErrorCodes.FILE_INVALID, 'File is not valid'],
  [ErrorCodes.FILE_EMPTY, 'File is empty'],
  [ErrorCodes.REQUEST_NOT_FOUND, 'Request is not found'],
  [ErrorCodes.UNKNOWN_REQUEST_STATUS, 'Unknown request status'],
  [ErrorCodes.NUMERIC, 'Only numbers are allowed'],
  [ErrorCodes.UNKNOWN_REQUEST_SUBJECT, 'Unknown request subject'],
  [ErrorCodes.UNKNOWN_EMAIL_OR_PHONE_NUMBER, 'Sorry, unrecognized e-mail address.'],
  [ErrorCodes.ACCOUNT_TYPE_CONTAINS_ACCOUNTS, 'This account type is used in an account'],
  [ErrorCodes.ZERO_AMOUNT, 'Amount is equals or less than zero'],
  [ErrorCodes.TRANSACTION_NOT_FOUND, 'Transaction is not found'],
  [ErrorCodes.UNEXPECTED_TRANSACTION_STATUS, 'Unexpected transaction status'],
  [ErrorCodes.DUPLICATE_ACCOUNT_NUMBER, 'Duplicate account number'],
  [ErrorCodes.ACCOUNT_TYPE_NOT_FOUND, 'Account type not found'],
  [ErrorCodes.INVALID_ACCOUNT_OWNER, 'The "Credit to" account does not exist or deposits are not allowed'],
  [ErrorCodes.RATES_DO_NOT_MATCH, 'Rates do not match'],
  [ErrorCodes.TEMPLATE_NOT_FOUND, 'Template is not found'],
  [ErrorCodes.CARD_NOT_FOUND, 'Card is not found'],
  [ErrorCodes.INVALID_CARD_OWNER, 'Invalid card owner'],
  [ErrorCodes.INVALID_TEMPLATE, 'Invalid template'],
  [ErrorCodes.CARD_TYPE_CATEGORY_NOT_FOUND, 'Card type category not found'],
  [ErrorCodes.CARD_TYPE_FORMAT_NOT_FOUND, 'Card type format not found'],
  [ErrorCodes.INVALID_QUERY_PARAMETERS, 'Invalid query parameters'],
  [ErrorCodes.CARD_TYPE_ASSOCIATED_WITH_CARDS, 'This card type is used in a card'],
  [ErrorCodes.LIMIT_EXCEEDED, 'You have exceeded the limits. Please upgrade the KYC level or contact the administrator.'],

  /* Permissions service */
  [ErrorCodes.ADMIN_GROUP_CONSTRAINT, 'This class is used in administrator profile'],

  /* Users service */
  [ErrorCodes.USER_HAS_FILES, 'This Registration Request cannot be cancelled because User profile has uploaded File(s).'],
  [ErrorCodes.USER_HAS_ACCOUNTS, 'This Registration Request cannot be cancelled because User profile has linked Account(s).'],
  [ErrorCodes.USER_HAS_CARDS, 'This Registration Request cannot be cancelled because User profile has linked Card(s).'],
  [ErrorCodes.USERS_IP_IS_BLOCKED, 'errors.The IP was blocked.'],
  [ErrorCodes.USERS_USER_IS_BLOCKED, 'The user was blocked.'],
  [ErrorCodes.USERS_USER_IS_DORMANT, 'The user is dormant.'],
  [ErrorCodes.USERS_AUTH_USER_IS_NOT_FOUND, 'The user is not found.'],
  [ErrorCodes.USERS_REGISTRATION_IS_NOT_CONFIRMED, 'Your registration is not confirmed by Administrator yet.'],
  [ErrorCodes.USERS_USER_IS_LOCKED, 'The user was locked.'],
  [ErrorCodes.USERS_USER_IS_NOT_ACTIVE, 'The user is not active.'],
  [ErrorCodes.USERS_AUTH_COMMON_ERROR, 'Group of errors from Cognito.'],
  [ErrorCodes.USERS_CONFIRM_REGISTRATION_LINK, 'User must confirm registration.'],
  [ErrorCodes.USERS_INVALID_USERNAME_OR_PASSWORD, 'Sorry, unrecognized email/phone or password.'],
  [ErrorCodes.USERS_INVALID_SECURITY_QUESTION_ANSWER, 'Invalid security question answer.'],
  [ErrorCodes.INVALID_CONFIRMATION_CODE, 'Invalid confirmation code.'],
  [ErrorCodes.CONFIRMATION_CODE_IS_INVALID, 'The one-time login link is no longer valid. Please try to reset your password.'],
  [ErrorCodes.CANNOT_RETRIEVE_COLLECTION, 'Cannot retrieve collection.'],
  [ErrorCodes.CANNOT_RETRIEVE_COLLECTION_COUNT, 'Cannot retrieve collection count.'],
  [ErrorCodes.CANNOT_CREATE_PAGINATION, 'Cannot create pagination.'],
  [ErrorCodes.REGISTRATION_REQUEST_NOT_FOUND, 'Registration request not found.'],
  [ErrorCodes.INVALID_APPROVAL_STATUS, 'Invalid approval status.'],
  [ErrorCodes.INVALID_CANCELLATION_STATUS, 'Invalid cancellaion status.'],
  [ErrorCodes.INVALID_FIELD, 'Invalid field'],
  [ErrorCodes.CANNOT_APPROVE_USER, 'Cannot approve an user.'],
  [ErrorCodes.CANNOT_CANCEL_USER, 'Cannot cancel an user.'],
  [ErrorCodes.CANNOT_UPDATE_USER, 'Cannot update an user.'],
  [ErrorCodes.MAINTENANCE_MODE, 'This system is temporarily unavailable.'],
  [ErrorCodes.RESET_PASSWORD_IS_NOT_ALLOWED, 'This action cannot be performed. Please, contact the site administrator.'],
  [ErrorCodes.ACTION_CANNOT_BE_PERFORMED, 'This action cannot be performed. Please, contact the site administrator.'],
  [ErrorCodes.USERS_INVALID_PASSWORD, 'Invalid password'],

  [ErrorCodes.UNAUTHORIZED, 'Sorry, unrecognized email/password or password. Have you forgotten your password?'],
  [ErrorCodes.CANNOT_FIND_USER_BY_EMAIL, 'Sorry, we are not recognized a username or an e-mail address.'],
  [ErrorCodes.CANNOT_DELETE_USER_GROUP, 'It is not possible to remove user group. User group has one or more linked profile.'],
  [ErrorCodes.USER_GROUP_ALREADY_EXISTS, 'User group with provided name already exists.'],
  [ErrorCodes.GROUP_NAME_DUPLICATION, 'Class with the same name already exists.'],
  [ErrorCodes.EMAIL_ALREADY_EXISTS, 'Provided email already exists.'],
  [ErrorCodes.PHONE_ALREADY_EXISTS, 'Provided phone number already exists.'],
  [ErrorCodes.NO_EMAIL_EXISTS, 'Provided email already exists.'],
  [ErrorCodes.NO_USERNAME_EXISTS, 'Provided username already exists.'],

  [ErrorCodes.USER_MUST_HAVE_ACTIVE_STATUS, 'User must have Active status.'],

  /* Currencies service */
  [ErrorCodes.ACCESS_TOKEN_NOT_FOUND, 'Access token not found.'],
  [ErrorCodes.ACCESS_TOKEN_INVALID, 'Your access session has expired. Please log in once again to continue the work.'],
  [ErrorCodes.CURRENCY_NOT_FOUND, 'Currency not found.'],
  [ErrorCodes.BAD_COLLECTION_PARAMS, 'Params for collections are not valid.'],
  [ErrorCodes.DEACTIVATING_MAIN_CURRENCY, 'Deactivating main currency is impossible.'],
  [ErrorCodes.INVALID_EXCHANGE_RATE, 'Sorry, no exchange rate currently available for this currency. Please contact support.'],
  [ErrorCodes.CURRENCY_IS_NOT_ACTIVE, 'The currency is not active.'],
  [ErrorCodes.EMPTY_FEED, 'The main currency does not have a link to a provider.'],
  [ErrorCodes.USED_CURRENCY, '{{currency}} currency is used in an account or card. Deactivating used currency is impossible.'],
  [ErrorCodes.CANNOT_SET_INACTIVE_CURRENCY_AS_MAIN, 'Main currency can not be not active'],

  /* Notification service */
  [ErrorCodes.CANNOT_UPDATE_COLLECTION, 'Could not update collection'],
  [ErrorCodes.BAD_TEST_SMTP_PARAMS, 'Test email failed - Please check SMTP settings'],
  [ErrorCodes.CANNOT_RETRIEVE_PROVIDER_DETAILS, 'Could not retrieve provider details'],
  [ErrorCodes.CANNOT_RETRIEVE_SETTING, 'Could not retrieve setting'],
  [ErrorCodes.CANNOT_UPDATE_SETTINGS, 'Could not update settings'],
  [ErrorCodes.SETTINGS_NOT_FOUND, 'Settings not found'],
  [ErrorCodes.INVALID_API_KEYS, 'Invalid API keys provided'],
  [ErrorCodes.NOT_FOUND, 'Not Found.'],

  /* Errors list - messages service */
  [ErrorCodes.MESSAGE_NOT_FOUND, 'Message not found'],
  [ErrorCodes.INVALID_QUERY_PARAMS, 'Invalid query params'],

  /* Reports service */
  [ErrorCodes.BAD_REQUEST, 'Bad Request'],
  [ErrorCodes.INTERNAL_SERVER_ERROR, 'Internal server error'],

  /* Validation errors */
  [ErrorCodes.IS_REQUIRED, 'Field is required.'],
  [ErrorCodes.REQUIRED_TRUE, 'Field is required.'],
  [ErrorCodes.REQUIRED_IF, 'Field is required.'],
  [ErrorCodes.REQUIRED_EMPTY, 'Value is required and cannot be empty.'],
  [ErrorCodes.PATTERN, 'Field has wrong pattern!'],
  [ErrorCodes.EMAIL_INNER, 'Field has wrong email format.'],
  [ErrorCodes.MIN_VALUE, 'Should be minimum {{value}}'],
  [ErrorCodes.MAX_VALUE, 'Should be maximum {{value}}'],
  [ErrorCodes.MIN_LENGTH, 'Should be minimum {{value}} chars.'],
  [ErrorCodes.MAX_LENGTH, 'Should be maximum {{value}} chars.'],
  [ErrorCodes.MIN_CHARACTERS, 'Minimum number of characters: {{value}}'],
  [ErrorCodes.MAX_CHARACTERS , 'Maximum number of characters: {{value}}'],
  [ErrorCodes.NOT_SPACES , 'No spaces allowed'],
  [ErrorCodes.DECIMAL_NOT_VALID , 'Maximum integers and/or decimals exceeded. Allowed format {{value}}'],
  [ErrorCodes.NOT_NUMBER, 'Only numbers are allowed.'],
  [ErrorCodes.MONTH_AND_YEAR_INVALID, 'Invalid date.'],
  [ErrorCodes.MIN_AGE, 'Minimum age requirements not met. Please revise date of birth.'],
  [ErrorCodes.NOT_ZERO, 'Amount must be greater than 0'],
  [ErrorCodes.NOT_ZERO_EXCHANGE, 'Exchange rate value cannot be 0'],
  [ErrorCodes.INVALID_USERNAME, 'Spaces are allowed; punctuation is not allowed except for periods, hyphens, apostrophes and underscores.'],
  [ErrorCodes.ALLOWED_ONLY_ALPHANUMERICS, 'Only alphanumeric characters allowed.'],
  [ErrorCodes.CONFIRM_FIELD_INVALID, 'Confirm field doesn\'t match.'],
  [ErrorCodes.CONFIRM_PASSWORD_INVALID, 'Passwords provided do not match.'],
  [ErrorCodes.CONFIRM_EMAIL_INVALID, 'Email addresses provided do not match.'],
  [ErrorCodes.DATE_INVALID, 'Date is invalid'],
  [ErrorCodes.SIGNATURE_INVALID, 'Invalid signature value. Signature must contain 8 numeric characters. No alpha characters, no spaces and no special characters allowed.'], // tslint:disable:max-line-length
  [ErrorCodes.NOT_EMPTY, 'This field must not be empty.'],
  [ErrorCodes.EMPTY_SUMMERNOTE, 'This field must not be empty.'],
  [ErrorCodes.FILE_EXTENSION, 'Invalid file extension.'],
  [ErrorCodes.FILE_SIZE, 'Maximum file size: {{value}}'],
  [ErrorCodes.GREATER_THAN, 'Should be greater than {{value}}.'],
  [ErrorCodes.SERVER_PORT, 'Should be valid port number from range 1 to 65535.'],
  [ErrorCodes.FEE_NAME_PATTERN, 'Allowed only alphanumerics, space, - and _.'],
  [ErrorCodes.MIN_LESS_THAN_MAX, 'Max should be more than Min'],
  [ErrorCodes.TAN_STANDARD_LESS_LIMIT, 'Should be less than Standard TANs Qty'],
  [ErrorCodes.TOKEN_REQUIRED, '{{value}} token is required'],
  [ErrorCodes.SAME_ACCOUNTS, 'Please select different accounts'],
  [ErrorCodes.SAME_USERS, 'Please select different users'],
  [ErrorCodes.USER_GROUP_NAME_PATTERN, 'Allowed only alphanumerics, space and _.\''],
  [ErrorCodes.SPECIAL_CHARACTER_REQUIRED, 'At least one special character is required: ' +
  '^ $ * . [ ] { } ( ) ? - + " ! @ # % & / \\ , > < \' : ; | _ ~ \'.'],
  [ErrorCodes.NUMBER_REQUIRED, 'At least one number is required.'],
  [ErrorCodes.UPPERCASE_LETTER_REQUIRED, 'At least one uppercase letter is required.'],
  [ErrorCodes.LOWERCASE_LETTER_REQUIRED, 'At least one lowercase letter is required.'],
  [ErrorCodes.MAX, 'Maximum number of characters: 255'],

  // files service
  [ErrorCodes.NOT_ENOUGH_SPACE_IN_FILES_STORAGE, 'Not enough space in the file storage'],
  [ErrorCodes.FILE_TOO_LARGE, 'File is too large'],

  /* Customization service */
  [ErrorCodes.CANNOT_SAVE_LOGO_AREA, 'Selected logo area must be a minimum of 20px high by 20px wide.'],
  [ErrorCodes.CANNOT_EDIT_DEFAULT_SCHEME, 'Cannot edit default color scheme'],
  [ErrorCodes.CANNOT_REMOVE_ACTIVE_SCHEME, 'Cannot remove active color scheme'],
  [ErrorCodes.CANNOT_REMOVE_DEFAULT_SCHEME, 'Cannot remove default color scheme'],
  [ErrorCodes.DATE_MORE_THAN_MAX_DATE, 'Date must be less or equal to {{value}}'],

  /*Permission Errors*/
  [UserPermissions.EXECUTE_CANCEL_PENDING_TRANSFER_REQUEST, 'Execute/Cancel Pending Transfer Requests'],
  [UserPermissions.APPROVE_CANCEL_REGISTRATION_REQUESTS, 'Approve/Cancel Registration Requests'],
  [UserPermissions.IMPORT_TRANSFER_REQUEST_UPDATES, 'Import Transfer Request Updates'],

  [UserPermissions.VIEW_ACCOUNT, 'View Accounts'],
  [UserPermissions.CREATE_ACCOUNT, 'Create Accounts'],
  [UserPermissions.CREATE_ACCOUNT_WITH_INITIAL_BALANCE, 'Create Accounts with Initial Balance'],
  [UserPermissions.MODIFY_ACCOUNTS, 'Modify Accounts'],
  [UserPermissions.MANUAL_DEBIT_CREDIT_ACCOUNT, 'Manual Debit/Credit Accounts'],
  [UserPermissions.VIEW_REVENUE, 'View Revenue'],
  [UserPermissions.MANAGE_REVENUE, 'Manage Revenue'],

  [UserPermissions.VIEW_CARDS, 'View Cards'],
  [UserPermissions.CREATE_CARDS, 'Create Cards'],
  [UserPermissions.MODIFY_CARDS, 'Modify Cards'],

  [UserPermissions.VIEW_USER_PROFILES, 'View User Profiles'],
  [UserPermissions.CREATE_USER_PROFILE, 'Create User Profiles'],
  [UserPermissions.MODIFY_USER_PROFILE, 'Modify User Profiles'],
  [UserPermissions.GENERATE_SEND_NEW_TANS, 'Generate & Send New TANs'],

  [UserPermissions.VIEW_ADMIN_PROFILES, 'View Admin Profiles'],
  [UserPermissions.CREATE_ADMIN_PROFILES, 'Create Admin Profiles'],
  [UserPermissions.MODIFY_ADMIN_PROFILE, 'Modify Admin Profiles'],

  [UserPermissions.VIEW_UNBLOCK_BLOCKED_PROFILES, 'View/Unblock Blocked Profiles'],

  [UserPermissions.INITIATE_EXECUTE_USER_TRANSFER, 'Initiate/Execute User Transfers'],
  [UserPermissions.SEND_REPLY_INITIAL_MESSAGE, 'Send/Reply Internal Messages'],
  [UserPermissions.CREATE_MODIFY_NEWS_ARTICLES, 'Create/Modify News Articles'],
  [UserPermissions.VIEW_SYSTEM_LOG, 'View System Log'],

  [UserPermissions.VIEW_SETTINGS, 'View Settings'],
  [UserPermissions.MODIFY_SETTINGS, 'Modify Settings'],
  [UserPermissions.CREATE_SETTINGS, 'Create Settings'],
  [UserPermissions.REMOVE_SETTINGS, 'Remove Settings'],
  [UserPermissions.MODIFY_ACCOUNT_TYPES, 'Create/Modify Account types'],
  [UserPermissions.CREATE_MODIFY_IWT_BANK_ACCOUNTS, 'Create/Modify IWT Bank Accounts'],

  [UserPermissions.VIEW_USER_REPORTS, 'View User Reports'],
  [UserPermissions.VIEW_GENERAL_SYSTEM_REPORTS, 'View General System Reports'],

  /* Custom Errors */
  [ErrorCodes.INVALID_CAPTCHA, 'Invalid CAPTCHA'],
  [ErrorCodes.PECUNIA_PHONE_NUMBER, 'Phone number must start with 6 or 7 and contain 9 digits.'],
  [ErrorCodes.PECUNIA_CARD_NOT_BALANCE, 'Transfer cannot be performed. Not enough funds.'],

  // spirits - accounts service
  [ErrorCodes.ACCOUNT_IS_EXTERNAL, 'Account is external.'],
  [ErrorCodes.CARD_IS_EXTERNAL, 'Card is external.'],
  [ErrorCodes.CARD_IS_BLOCKED, 'Card is blocked.'],
  [ErrorCodes.RECIPIENT_CARD_IS_BLOCKED, 'Transfer cannot be processed: Recipient card has blocked status.'],
  [ErrorCodes.FAIL_RECEIVE_EXTERNAL_TRANSACTIONS, 'Request could not be processed [PEC003]. Please contact the administrator.'],
  [ErrorCodes.ACCOUNT_TYPE_IS_EXTERNAL, 'Account type is external.'],
  [ErrorCodes.CARD_TYPE_IS_EXTERNAL, 'Card type is external.'],
  [ErrorCodes.CARD_TYPE_CONTAINS_CARDS, 'Card type contains cards.'],
  [ErrorCodes.CURRENCIES_RATE_NOT_FOUND, 'Failed get rate for currencies.'],
  [ErrorCodes.EXTERNAL_CARD_EXIST, 'User already has card for this card provider.'],
  [ErrorCodes.TEMP_AUTH_TOKEN_NOT_FOUND, 'Temp auth token is required but it\'s empty or not found'],
  [ErrorCodes.TEMP_AUTH_TOKEN_INVALID, 'Time\'s up. Please log in and try again'],
  [ErrorCodes.EXTERNAL_ACCOUNT_NOT_FOUND, 'Account not found. Please try again'],

  // spirits - user service
  [ErrorCodes.CARD_PROVIDER_API_TOKEN_INVALID, 'Service currently unavailable [PEC002]. Please contact administrator.'],
  [ErrorCodes.CARD_PROVIDER_SERVER_ERROR, 'Service currently unavailable [PEC001]. Please try again later.'],
  [ErrorCodes.CANNOT_CREATE_USER_WITH_REGISTRATION_REQUEST, 'Cannot create user with registration request.'],
  [ErrorCodes.DOCUMENT_TYPE_ONE_OF, 'Invalid document type.'],
  [ErrorCodes.MAX_FILE_SIZE, 'Invalid file size.'],
  [ErrorCodes.INVALID_FILE_TYPE, 'Invalid file type.'],
  [ErrorCodes.CARD_PROVIDER_API_KYC_TIMEOUT, 'Unable to process. Please try again.'],
  [ErrorCodes.CARD_PROVIDER_API_KYC_FAIL, 'Please ensure the supplied data matches the documents provided and try again.'],
  [ErrorCodes.PECUNIA_ACCOUNT_IS_EXISTS, 'It seems you are already registered in our system. Please contact the administrator for help.'],

  /* Errors for specific fields */
  [
    'previousPassword',
    new Map<ErrorCodes | string, string>([
      [ErrorCodes.INVALID_FIELD, 'Previous password is invalid'],
    ])
  ],

  /* Spirits errors @TODO: To be moved to the spirits dictionary */
  [
  'signature',
    new Map<ErrorCodes | string, string>([
      [ErrorCodes.INVALID_FIELD, 'Invalid signature'],
    ])
  ]
]);

export function getErrorMessageForValidation(code: string, value?: string | number) {
  if (ErrorDictionary.has(code)) {
    if (value !== undefined) {
      const error: string = <string>ErrorDictionary.get(code);
      return error.replace(/({{value}})/, () => value.toString());
    }
    return ErrorDictionary.get(code);
  }
  return '';
}
