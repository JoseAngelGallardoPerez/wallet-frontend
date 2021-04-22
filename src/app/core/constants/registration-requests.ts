export const STATUS_PENDING = 'pending';
export const STATUS_CANCELED = 'canceled';
export const STATUS_ACTIVE = 'active';
export const STATUS_ACCEPTED = 'accepted';
export const STATUS_DORMANT = 'dormant';

export const STATUS_VIEW_DATA = {
  [STATUS_PENDING]: { text: 'Pending', klass: 'status_pending' },
  [STATUS_CANCELED]: { text: 'Canceled', klass: 'status_canceled' },
  [STATUS_ACTIVE]: { text: 'Approved', klass: 'status_executed' },
  [STATUS_ACCEPTED]: { text: 'Approved', klass: 'status_executed' },
  [STATUS_DORMANT]: { text: 'Dormant', klass: 'status_canceled' },
};
