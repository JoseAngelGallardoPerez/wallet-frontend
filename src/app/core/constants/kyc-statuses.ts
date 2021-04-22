import { SelectItemInterface } from '@interfaces/selectItemInterface';

export const KYC_STATUSES = {
  APPROVED: 'approved',
  UNVERIFIED: 'unverified',
  PENDING: 'pending',
  CANCELED: 'canceled',
  WAITING: 'waiting',
  NOT_FILLED: 'not-filled',
  NOT_AVAILABLE: 'not-available',
};

export const KYC_REQUIREMENTS_VIEW_STATUSES = {
  [KYC_STATUSES.APPROVED]: 'Verified',
  [KYC_STATUSES.UNVERIFIED]: 'Unverified',
  [KYC_STATUSES.PENDING]: 'Pending',
  [KYC_STATUSES.WAITING]: 'Waiting',
  [KYC_STATUSES.CANCELED]: 'Failed',
  [KYC_STATUSES.NOT_FILLED]: 'Not Filled',
  [KYC_STATUSES.NOT_AVAILABLE]: 'Not Available',
};

export const kycStatusSelectItems: SelectItemInterface[] = [
  { key: KYC_REQUIREMENTS_VIEW_STATUSES[KYC_STATUSES.APPROVED], value: KYC_STATUSES.APPROVED },
  { key: KYC_REQUIREMENTS_VIEW_STATUSES[KYC_STATUSES.PENDING], value: KYC_STATUSES.PENDING },
  { key: KYC_REQUIREMENTS_VIEW_STATUSES[KYC_STATUSES.CANCELED], value: KYC_STATUSES.CANCELED },
];

export const getKycViewStatus = (statusCode: string): string => {
  return KYC_REQUIREMENTS_VIEW_STATUSES[statusCode] || statusCode;
};

export const getKycRequestViewStatus = (statusCode: string): string => {
  return statusCode === KYC_STATUSES.APPROVED ? KYC_STATUSES.APPROVED : KYC_STATUSES.UNVERIFIED;
};
