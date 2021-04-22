export interface ProfileFilter {

  filter?: {
    query?: string,
    status?: string,
    userGroupId?: string,
    dateFrom?: string,
    dateTo?: string,
    roleName?: string,
    isBlocked?: boolean,
  };

  sort: string;
  page: string;
  limit: string;
}
