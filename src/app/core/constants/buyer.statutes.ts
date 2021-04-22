import { SelectItemInterface } from '@interfaces/selectItemInterface';

export const BUYER_STATUSES = {
  PENDING_REVIEW: 'buyer_pending_review',
  ACTIVE: 'buyer_active',
  CANCELED: 'buyer_cancelled',
  STALE: 'buyer_stale',
  ACTIVE_TRADED: 'buyer_active_traded',
  PAID: 'buyer_paid',
  OVERDUE: 'buyer_overdue'
};

export const INVOICES_FILTER_STATUSES: SelectItemInterface[] = [
  { key: '', value: 'All Statuses' },
  { key: BUYER_STATUSES.PENDING_REVIEW, value: 'Pending Review' },
  { key: BUYER_STATUSES.ACTIVE, value: 'Active' },
  { key: BUYER_STATUSES.STALE, value: 'Stale' },
  { key: BUYER_STATUSES.ACTIVE_TRADED, value: 'Traded' },
  { key: BUYER_STATUSES.PAID, value: 'Paid' },
  { key: BUYER_STATUSES.OVERDUE, value: 'Overdue' },
  { key: BUYER_STATUSES.CANCELED, value: 'Cancelled' },
];
