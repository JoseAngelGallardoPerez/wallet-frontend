import { SelectItemInterface } from '@interfaces/selectItemInterface';

export const USER_PROFILE_STATUSES: SelectItemInterface[] = [
  { key: 'pending', value: 'Pending' },
  { key: 'active', value: 'Active' },
  { key: 'blocked', value: 'Inactive' },
  { key: 'dormant', value: 'Dormant' },
];

export const USER_PROFILE_FILTER_STATUSES: SelectItemInterface[] = [
  { key: '', value: 'All Statuses' },
  { key: 'pending', value: 'Pending' },
  { key: 'active', value: 'Active' },
  { key: 'blocked', value: 'Inactive' },
  { key: 'dormant', value: 'Dormant' },
];

export const USER_STATUSES = {
  PENDING: 'pending',
  ACTIVE: 'active',
  BLOCKED: 'blocked',
  DORMANT: 'dormant',
};

export const USER_COMPANY_TYPE: SelectItemInterface[] = [
  { key: 'pending', value: 'Pending' },
  { key: 'active', value: 'Active' },
  { key: 'blocked', value: 'Inactive' },
  { key: 'dormant', value: 'Dormant' },
];
