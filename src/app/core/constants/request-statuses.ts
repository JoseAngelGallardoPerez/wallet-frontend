import { SelectItemInterface } from '@interfaces/selectItemInterface';

export const PENDING_STATUS = 'pending';
export const EXECUTED_STATUS = 'executed';
export const APPROVED_STATUS = 'approved';
export const ACTIVE_STATUS = 'active';
// TODO: remove one
export const CANCELED_STATUS = 'canceled';
export const CANCELLED_STATUS = 'cancelled';
export const DORMANT_STATUS = 'dormant';
export const BLOCKED_STATUS = 'blocked';
export const NEW_STATUS = 'new';

export const STATUS_TEXTS = {
  [PENDING_STATUS]: 'Pending request',
  [EXECUTED_STATUS]: 'Executed',
  [CANCELED_STATUS]: 'Canceled',
  [CANCELLED_STATUS]: 'Canceled',
  [ACTIVE_STATUS]: 'Active',
  [DORMANT_STATUS]: 'Dormant',
  [APPROVED_STATUS]: 'Approved',
  [BLOCKED_STATUS]: 'Inactive',
  [NEW_STATUS]: 'New',
};

export const STATUS_VIEW_DATA = {
  [PENDING_STATUS]: { text: STATUS_TEXTS[PENDING_STATUS], klass: 'status_pending' },
  [APPROVED_STATUS]: { text: STATUS_TEXTS[APPROVED_STATUS], klass: 'status_executed' },
  [EXECUTED_STATUS]: { text: STATUS_TEXTS[EXECUTED_STATUS], klass: 'status_executed' },
  [CANCELED_STATUS]: { text: STATUS_TEXTS[CANCELED_STATUS], klass: 'status_canceled' },
  [CANCELLED_STATUS]: { text: STATUS_TEXTS[CANCELLED_STATUS], klass: 'status_canceled' },
  [ACTIVE_STATUS]: { text: STATUS_TEXTS[ACTIVE_STATUS], klass: 'status_executed' },
  [DORMANT_STATUS]: { text: STATUS_TEXTS[DORMANT_STATUS], klass: 'status_dormant' },
  [BLOCKED_STATUS]: { text: STATUS_TEXTS[BLOCKED_STATUS], klass: 'status_blocked' },
  [NEW_STATUS]: { text: STATUS_TEXTS[NEW_STATUS], klass: 'status_new' },
};

export const statusFilterOptions: SelectItemInterface[] = [
  { key: '', value: 'All Statuses' },
  { value: STATUS_TEXTS[PENDING_STATUS], key: PENDING_STATUS },
  { value: STATUS_TEXTS[EXECUTED_STATUS], key: EXECUTED_STATUS },
  { value: STATUS_TEXTS[CANCELLED_STATUS], key: CANCELLED_STATUS },
];

export const STATUSES = {
  PENDING_STATUS: PENDING_STATUS,
  APPROVED_STATUS: EXECUTED_STATUS,
  EXECUTED_STATUS: APPROVED_STATUS,
};
