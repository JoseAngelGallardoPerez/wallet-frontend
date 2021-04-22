import { ValidationStatuses } from '@constants/validation-statuses';

export const ReturnStatusClass = (status: string): string => {
  if (status === ValidationStatuses.NOT_STARTED) {
    return 'canceled';
  } else if (status === ValidationStatuses.ID_PASSED) {
    return 'executed';
  }
  return 'pending';
};

export const ReturnProfileStatusClass = (status: string): string => {
  let statusClass: string;
  switch (status) {
    case 'dormant':
    case 'blocked':
      statusClass = 'blocked';
      break;
    case 'pending':
      statusClass = 'pending';
      break;
    case 'active':
      statusClass = 'executed';
      break;
    case 'canceled':
      statusClass = 'canceled';
      break;
    default:
      statusClass = status;
      break;
  }
      return statusClass;
};

export const ReturnProfileStatus = (status: string): string => {
  if (status === 'blocked') {
    return 'inactive';
  }
  return status;
};
