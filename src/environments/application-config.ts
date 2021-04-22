import { environment } from '@environments/environment';

const API_URIS = {

  auth: {
    me: '/users/private/v1/limited/auth/me',
    login: '/users/public/v1/auth/signin',
    signup: '/users/public/v1/auth/signup',
    generateSmsCode: `/users/private/v1/auth/generate-new-phone-code`,
    generateEmailCode: `/users/private/v1/auth/generate-new-email-code`,
    smsConfirmation: `/users/private/v1/auth/check-phone-code`,
    emailConfirmation: `/users/private/v1/auth/check-email-code`,
    confirm: '/users/public/v1/auth/confirm',
    forgotPassword: '/users/public/v1/auth/forgot-password',
    resetPassword: '/users/public/v1/auth/reset-password',
    resetPasswordById: (uid: string) => `/users/private/v1/users/${uid}/reset-password`,
    changePassword: '/users/private/v1/auth/change_password',
    confirmationCode: (link: string) => `/users/public/v1/auth/confirmation-code/${link}`,
    setPasswordFromOneTime: `/users/public/v1/auth/set-password`,
    setSecurityQuestions: '/users/private/v1/limited/users/security-questions-answers',
    refreshToken: '/users/public/v1/auth/refresh',
    userById: (id: string) => `/users/private/v1/limited/users/profile/${id}`,
    logout: '/users/private/v1/auth/logout',
    issueTokensForUserByUid: (uid: string) => `/users/private/v1/auth/root/issue-tokens-for-user-by-uid/${uid}`,
    files: {
      privateFile: `/files/private/v1/limited/private`,
    },
    verification: {
      authVerification: `/users/private/v1/limited/verifications`,
    }
  },

  files: {
    limitedPrivateFile: `/files/private/v1/limited/private`,
    limitedFilesById: (uid: string) => `/files/private/v1/limited/${uid}`,
    fileBinaryById: (id: number) => `/files/public/v1/storage/bin/${id}`,
    filePrivateBinaryById: (id: number) => `/files/private/v1/storage/bin/${id}`,
  },

  user: {
    users: '/users/private/v1/users/',
    shortUsers: '/users/private/v1/short-users/',
    limitedProfile: '/users/private/v1/limited/auth/me',
    myProfile: '/users/private/v1/auth/me',
    unblockProfiles: '/users/private/v1/users/unblock',
    exportRegistrationRequestsToCsv: '/users/private/v1/export/registration-requests',
    exportUserProfilesToCsv: '/users/private/v1/export/user-profiles',
    exportAdminProfilesToCsv: '/users/private/v1/export/admin-profiles',
    registrationRequests: '/users/private/v1/registration-requests/',
    files: {
      myProfileFiles: '/files/private/v1/users/me',
      userProfileFiles: (id: string) => `/files/private/v1/users/${id}`,
      publicFiles: (id: string) => `/files/private/v1/files/public/${id}`,
      privateFile: (id: string) => `/files/private/v1/files/private/${id}`,
      adminOnlyFile: (id: string) => `/files/private/v1/files/admin-only/${id}`,
    },
    userById: (id: string) => `/users/private/v1/users/${id}`,
    shortUserById: (id: string) => `/users/private/v1/short-users/${id}`,
    profileSettings: (id: string) => `/users/private/v1/settings/${id}`,
    approveUser: (id: number) => `/users/private/v1/registration-requests/approve/${id}`,
    cancelUser: (id: number) => `/users/private/v1/registration-requests/cancel/${id}`,
    registrationRequestById: (id: number) => `/users/private/v1/registration-requests/${id}`,
    extensions: {
      captchaActivity: '/users/public/v1/extensions/captcha/activity',
      captchaGenerate: '/users/public/v1/extensions/captcha/generate',
    }
  },

  userGroup: {
    groups: '/users/private/v1/user-groups',
    userGroupById: (id: number) => `/users/private/v1/user-groups/${id}`,
  },

  message: {
    unread: '/messages/private/v1/count/messages/unread',
    unassigned: '/messages/private/v1/admin/messages/unassigned',
    allMessages: '/messages/private/v1/admin/messages',
    sendToAll: '/messages/private/v1/admin/messages/send-to-all',
    sendToSpecificGroup: '/messages/private/v1/admin/messages/send-to-user-group',
    sendToSpecificUsers: '/messages/private/v1/admin/messages/send-to-specific-users',
    messages: '/messages/private/v1/messages',
    adminUnassignedAndIncomingMessages: '/messages/private/v1/admin/messages/unassigned-and-incoming',
    exportCsv: {
      userMessages: '/messages/private/v1/csv/messages',
      adminMessages: '/messages/private/v1/csv/admin/messages',
      adminUnassignedAndIncomingMessages: '/messages/private/v1/csv/admin/messages/unassigned-and-incoming',
    },
    messageById: (id: number) => `/messages/private/v1/messages/${id}`,
    deleteForMe: (id: number) => `/messages/private/v1/messages/${id}/for-me`,
    deleteForAll: (id: number) => `/messages/private/v1/messages/${id}/for-all`,
  },

  currency: {
    cardTypes: '/currencies/private/v1/card-types',
    currencies: '/currencies/private/v1/currencies',
    currenciesAdmin: '/currencies/private/v1/admin/currencies',
    mainCurrency: '/currencies/private/v1/currencies/main',
    settings: '/currencies/private/v1/admin/settings/main',
    mainCurrencyExchangeRates: '/currencies/private/v1/rates/main',
    updateRates: '/currencies/private/v1/admin/rates',
    currencyById: (id: number) => `/currencies/private/v1/admin/currencies/${ id }`,
  },

  rate: {
    rates: '/currencies/private/v1/rates/main',
    ratesOperations: '/currencies/private/v1/admin/rates',
    forMainCurrency: '/currencies/private/v1/rates/pair',
  },

  account: {
    accounts: '/accounts/private/v1/accounts',
    adminAccounts: '/accounts/private/v1/admin/accounts',
    accountById: (id: number) => `/accounts/private/v1/accounts/${ id }`,
    accountTypes: '/accounts/private/v1/account-types',
    accountTypeById: (id: number) => `/accounts/private/v1/account-types/${ id }`,
    cards: '/accounts/private/v1/own-cards',
    adminCards: '/accounts/private/v1/cards',
    userCards: '/accounts/private/v1/own-cards',
    cardById: (id: number) => `/accounts/private/v1/cards/${ id }`,
    cardTypes: '/accounts/private/v1/card-types',
    cardTypeById: (id: number) => `/accounts/private/v1/card-types/${ id }`,
    deleteCardType: (id: number) => `/accounts/private/v1/card-types/${ id }`,
    generateAccountNumber: '/accounts/private/v1/generate/accounts/number',
    paymentMethods: '/accounts/private/v1/payment-methods',
    paymentPeriods: '/accounts/private/v1/payment-periods',
    revenueAccounts: '/accounts/private/v1/revenue-accounts',
    iwtBankDetails: '/accounts/private/v1/iwt-bank-accounts',
    importAccountsFromCsv: '/accounts/private/v1/import/accounts',
    importCardsFromCsv: '/accounts/private/v1/import/cards',
    updateTransfersFromCsv: '/accounts/private/v1/admin/requests/csv/update',
    importTransfersFromCsv: '/accounts/private/v1/admin/requests/csv/import',
    exportAccountsToCsv: '/accounts/private/v1/admin/export/accounts',
    exportCardsToCsv: '/accounts/private/v1/admin/export/cards',
    exportRevenueAccountsToCsv: '/accounts/private/v1/admin/export/cards',
    exportTransferRequestsToCsv: '/accounts/private/v1/admin/export/transfer-requests',

    requests: '/accounts/private/v1/requests',
    tbaRequestPreview: '/accounts/private/v1/tba-requests/preview',
    tbaRequest: '/accounts/private/v1/tba-requests',
    tbuRequestPreview: '/accounts/private/v1/tbu-requests/preview',
    tbuRequest: '/accounts/private/v1/tbu-requests',
    owtRequestPreview: '/accounts/private/v1/owt-requests/preview',
    owtRequest: '/accounts/private/v1/owt-requests',
    caRequestPreview: '/accounts/private/v1/admin/ca-requests/preview',
    caRequest: '/accounts/private/v1/admin/ca-requests',
    daRequestPreview: '/accounts/private/v1/admin/da-requests/preview',
    daRequest: '/accounts/private/v1/admin/da-requests',
    cftRequestPreview: '/accounts/private/v1/cft-requests/preview',
    cftRequest: '/accounts/private/v1/cft-requests',
    tanSettings: '/accounts/private/v1/settings',
    draRequest: '/accounts/private/v1/admin/dra-requests',
    myTansCount: '/accounts/private/v1/user/tan/count',
    tanExtensionActivityStatus: '/accounts/private/v1/admin/tan/tan-by-sms/activity',
    requestTan: '/accounts/private/v1/user/tan',
    requestTanAvailability: '/accounts/private/v1/user/tan/request/availability',
    tansCountByUserId: (id: string) => `/accounts/private/v1/admin/tan/count/${ id }`,
    generateTansByUserId: (id: string) => `/accounts/private/v1/admin/tan/${ id }`,
    urlUserTemplates: (part: string | number) => `/accounts/private/v1/user/templates/${ part }`,
    tanSettingForTransfer: (settingVal: string) => `/accounts/private/v1/settings/${ settingVal }`,
    tbaRequestPreviewAsAdmin: (userId: string) => `/accounts/private/v1/admin/tba-requests/preview/user/${ userId }`,
    tbaRequestAsAdmin: (userId: string) => `/accounts/private/v1/admin/tba-requests/user/${ userId }`,
    tbuRequestPreviewAsAdmin: (userId: string) => `/accounts/private/v1/admin/tbu-requests/preview/user/${ userId }`,
    tbuRequestAsAdmin: (userId: string) => `/accounts/private/v1/admin/tbu-requests/user/${ userId }`,
    owtRequestPreviewAsAdmin: (userId: string) => `/accounts/private/v1/admin/owt-requests/preview/user/${ userId }`,
    owtRequestAsAdmin: (userId: string) => `/accounts/private/v1/admin/owt-requests/user/${ userId }`,
    updateRequestById: (id: string) => `/accounts/private/v1/admin/requests/${ id }`,
    revenueAccountById: (id: number) => `/accounts/private/v1/revenue-accounts/${ id }`,
    deductFromRevenueAccountById: (id: number) => `/accounts/private/v1/revenue-accounts/${ id }/deduct`,
    getRequest: (id: string) => `/accounts/private/v1/requests/${ id }`,
    executeRequest: (id: string) => `/accounts/private/v1/admin/requests/execute/${ id }`,
    cancelRequest: (id: string) => `/accounts/private/v1/admin/requests/cancel/${ id }`,
    iwtBankDetailsSingleById: (id: number) => `/accounts/private/v1/iwt-bank-accounts/${ id }`,
    iwtBankDetailsByAccountId: (id: number) => `/accounts/private/v1/iwt-bank-accounts/${ id }/by-account-id`,

    transactions: {
      userRequests: '/accounts/private/v1/user/requests',
      userList: '/accounts/private/v1/user/transactions',
      userInfo: '/accounts/private/v1/user/info/transactions',
      transactionById: (id: string) => `/accounts/private/v1/user/transactions/${id}`,
      exportCsv: '/accounts/private/v1/user/export/transactions-report'
    },

    countries: {
      list: '/accounts/public/v1/countries',
      countryById: (id: string) => `/accounts/public/v1/countries/${id}`
    },
  },

  file: {
    files: '/files/private/v1/files',
    uploadPrivate: '/files/private/v1/files/public',
    uploadAdminOnly: '/files/private/v1/files/admin-only',
    uploadPublic: (id: string) => `/files/private/v1/files/public/${id}`,
    fileById: (id: number) => `/files/private/v1/files/${id}`,
    fileBinaryById: (id: number) => `/files/public/v1/storage/bin/${id}`,
    filePrivateBinaryById: (id: number) => `/files/private/v1/storage/bin/${id}`,
  },

  reports: {
    getSAS: '/reports/private/v1/account', // getSAS: '/reports/private/v1/account?includeAdditionalEntities=1',
    getAllAccTransactions: '/reports/private/v1/transaction',
    getUserAllAccBalance: '/reports/private/v1/balance?includeAdditionalEntities=1',
    exportUserAllAccountsBalancesToCsv: '/reports/private/v1/balance/export',
    exportUserAllAccountsTransactionsToCsv: '/reports/private/v1/transaction/export',
    exportUserSpecificAccountStatementToCsv: '/reports/private/v1/account/export',
  },

  systemLog: {
    loadLogList: '/logs/private/v1/admin/system-logs?include=user',
    exportInformationLogsToCsv: '/logs/private/v1/admin/export/information-log',
    exportTransactionLogsToCsv: '/logs/private/v1/admin/export/transactions-log',
    loadLogView: (id: number) => `/logs/private/v1/admin/system-logs/${ id }?include=user`,
  },

  scheduledTransaction: {
    loadList: '/accounts/private/v1/scheduled-transactions?include=account,account.type',
    exportToCsv: '/accounts/private/v1/admin/export/scheduled-transactions?include=account,account.type',
    getById: (id: number) => `/accounts/private/v1/scheduled-transactions/${ id }`,
  },

  permission: {
    admin: {
      groups: '/permissions/private/v1/admin/group?scope=admin',
      clientGroups: '/permissions/private/v1/admin/group?scope=client',
      permissionGroupActions: `/permissions/private/v1/admin/action`,
      permissionGroupById: (id: number) => `/permissions/private/v1/admin/group/${id}`,
      category: '/permissions/private/v1/admin/category',
    },
    permissionsByUserId: `/permissions/private/v1/admin/permission`,
  },

  securityQuestions: {
    list: '/users/public/v1/security-questions',
    userQuestionsAnswers: (id: string) => `/users/private/v1/security-questions-answers/${ id }`,
    updateQuestionsAnswers: '/users/private/v1/security-questions-answers/'
  },

  blockedIpAddresses: {
    getAll: '/users/private/v1/blocked-ips',
    unblock: '/users/private/v1/blocked-ips/unblock'
  },

  fee: {
    create: '/accounts/private/v1/admin/fee/transfer',
    forSubject: (subject: string) => `/accounts/private/v1/admin/fee/transfer/subject/${ subject }`,
    feeById: (id: number) => `/accounts/private/v1/admin/fee/transfer/id/${ id }`,
    feeParametersById: (id: number) => `/accounts/private/v1/admin/fee/transfer/parameters/${ id }`,
    userFeeType: (subject: string) => `/accounts/private/v1/user/fee/transfer/subject/${ subject }`
  },

  options: {
    update: '/settings/private/v1/config',
    load: (path: string) => `/settings/private/v1/config/${ path }`,
    loadPublic: (path: string) => `/settings/public/v1/config/${ path }`,
  },

  systemEmail: {
    commonSettings: '/notifications/private/v1/settings',
    templateSettings: '/notifications/private/v1/templates',
    testEmail: '/notifications/private/v1/test/smtp',
    emailTokens: '/notifications/private/v1/settings/tokens',
    templateSettingsLoad: (path: string) => `/notifications/private/v1/templates/${ path }`
  },

  systemSms: {
      settings: '/notifications/private/v1/settings',
      testSms: '/notifications/private/v1/test/sms',
  },

  kyc: {
    getListRequests: '/kyc/private/v1/admin/requests',
    updateRequestStatus: (requestId: string) => `/kyc/private/v1/admin/request/${ requestId }/update-status`,
    updateRequirementStatus: (requirementId: string, userId: string) => `/kyc/private/v1/admin/requirement/${ requirementId }/user/${ userId }/update-status`,  // tslint:disable:max-line-length

    updateRequirementByAdmin: (requirementId: string, userId: string) => `/kyc/private/v1/admin/requirement/${ requirementId }/user/${ userId }`,  // tslint:disable:max-line-length
    getListTiers: (userId: string) => `/kyc/private/v1/admin/tiers/user/${ userId }`,

    // getTierById: (tierId: string): string => `/kyc/private/v1/tier/${ tierId }`,
    createRequest: '/kyc​/private​/v1​/requests',
    getCurrentTier: '/kyc/private/v1/tiers/current',

    getCountriesList: `/kyc/private/v1/admin/countries`,
    getTiersByCountryCode: (code: string) => `/kyc/private/v1/admin/country/${ code }/tiers`,
    tierSetting: (tierId: string) => `/kyc/private/v1/admin/tier/${ tierId }`,
  },

  adminReports: {
    allTransaction: '/reports/private/v1/admin/user/transaction',
    allTransactionCsv: '/reports/private/v1/admin/user/transaction/export',
    balance: '/reports/private/v1/admin/user/balance',
    balanceCsv: '/reports/private/v1/admin/user/balance/export',
    adminTransaction: '/reports/private/v1/admin/system/transaction',
    adminTransactionCsv: '/reports/private/v1/admin/system/transaction/export',
    adminBalance: '/reports/private/v1/admin/system/balance',
    adminBalanceCsv: '/reports/private/v1/admin/system/balance/export',
    maturityDates: '/reports/private/v1/admin/system/maturity',
    maturityDatesCsv: '/reports/private/v1/admin/system/maturity/export',
    account: '/reports/private/v1/admin/user/account',
    accountCsv: '/reports/private/v1/admin/user/account/export',
    owtTransaction: '/reports/private/v1/admin/system/outgoing-transfer',
    owtTransactionCsv: '/reports/private/v1/admin/system/outgoing-transfer/export',
    card: '/reports/private/v1/admin/system/card',
    cardCsv: '/reports/private/v1/admin/system/card/export',
    revenue: '/reports/private/v1/admin/system/revenue',
    revenueCsv: '/reports/private/v1/admin/system/revenue/export',
    accessLog: '/reports/private/v1/admin/system/access',
    accessLogCsv: '/reports/private/v1/admin/system/access/export',
    manualTransaction: '/reports/private/v1/admin/system/manual-transaction',
    manualTransactionCsv: '/reports/private/v1/admin/system/manual-transaction/export',
    interest: '/reports/private/v1/admin/system/interests',
    interestCsv: '/reports/private/v1/admin/system/interests/export',
    overview: '/reports/private/v1/admin/system/overview',
    overviewCsv: '/reports/private/v1/admin/system/overview/export',
  },

  news: {
    allNews: '/news/private/v1/article',
    singleNews: (id: number) => `/news/private/v1/article/${ id }`
  },

  customization: {
    logoLink: '/assets/images/velmie/velmie_logo.png',
  },

  notifications: {
    plivoAccountDetails: '/notifications/private/v1/notifiers/plivo/details',
    mySettings: '/notifications/private/v1/user-settings',
    userSettings: (uid: string): string => `/notifications/private/v1/user-settings/${ uid }`,
    getPublicEmail: `/notifications/public/v1/settings/email-from`,
  },

  verification: {
    createVerification: '/users/private/v1/verifications',
    userVerification: (id: string) => `/users/private/v1/verifications/list/${id}`,
    approveVerification: (id: number) => `/users/private/v1/verifications/approve/${id}`,
    cancelVerification: (id: number) => `/users/private/v1/verifications/cancel/${id}`,

    status: (userId: string): string => `/verification/private/v1/admin/user/${userId}/status`,
    verificationImage: (path: string, requestId: number): string => `/verification/private/v1/admin/request/${requestId}/${path}-image`,
    exportCsv: (path: string, userId: string): string => `/verification/private/v1/admin/user/${userId}/${path}/csv`,
    sendValidationLink: `/verification/private/v1/admin/generate-verification`,
    usersStatus: `/verification/private/v1/admin/users-status`,
    requests: (userId: string): string => `/verification/private/v1/admin/user/${userId}/requests`,
    settings: `/verification/private/v1/admin/elinq/settings`,
    services: `/verification/private/v1/admin/elinq/services`,
  },

  extensions: {
    extensionsList: '/extensions/private/v1/extensions',
    extension: (serviceName: string) => `/extensions/private/v1/extensions/${ serviceName }`,
    extensionsSettingsList: (serviceName: string) => `/extensions/private/v1/extensions/${ serviceName }/settings/elements`,
    extensionsSettings: (serviceName: string) => `/extensions/private/v1/extensions/${serviceName}/settings`,
    getExtensionsActivityStatus: (url: string) => url,
    accountNumberLength: {
      getValidatorData: '/accounts/private/v1/form/account/post'
    },
    removeBranding: '/settings/public/v1/extensions/remove_branding',
  },

  asynchronous: {
    jobs: (jobsId: string) => `/users/public/v1/jobs/${jobsId}`,
  },

  invoices: {
    sampleFile: '/accounts/private/v1/download/sample-file',
    listInvoices: '/accounts/private/v1/invoice',
    massChangeStatus: '/accounts/private/v1/invoice/mass-change-status',
    invoice: (id: number) => `/accounts/private/v1/invoice/${id}`,
    change_status: (id: number) => `/accounts/private/v1/invoice/${id}/change-status`,
    files: {
      uploadInvoice: '/accounts/private/v1/invoice/upload'
    }
  },

  externalApis: {
    currentCountry: 'http://ip-api.com/json'
  },
};

const PAGES = {

  // placeholder
  placeholder: '/placeholder-page',

  // auth
  login: '/sign-in',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  signup: '/sign-up',
  completeRegistration: '/complete-registration',

  // messages
  messagingHistory: '/messages/messaging-history',
  newMessage: '/messages/new-message',
  conversation: '/messages/conversation',

};

const LIMITS = {
  messages: 10,
};

const PATTERNS = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // tslint:disable:max-line-length
};

export const APPLICATION_CONFIG = {
  endpoint: environment.apiHost,
  api: API_URIS,
  pages: PAGES,
  limits: LIMITS,
  patterns: PATTERNS,
};
