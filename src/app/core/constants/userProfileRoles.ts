import { SelectItemInterface } from '@interfaces/selectItemInterface';

export const USER_PROFILE_ROLE_ROOT = 'root';
export const USER_PROFILE_ROLE_ADMIN = 'admin';
export const USER_PROFILE_ROLE_CLIENT = 'client';

export const USER_PROFILE_ROLES: SelectItemInterface[] = [
    { key: USER_PROFILE_ROLE_ROOT, value: 'Root' },
    { key: USER_PROFILE_ROLE_ADMIN, value: 'Admin' },
    { key: USER_PROFILE_ROLE_CLIENT, value: 'Client' }
  ];
