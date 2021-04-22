import { ApiError } from '@models/api-error.model';

export interface CallResponceInterface {
  error: boolean;
  links?: {
    self: string,
    first: string,
    last: string,
    pages: number
  };
  includeEntities?: any | null;
  data: { items: any[] } | {
    items: any[],
    total_page: number,
    total_record: number,
    page: number,
    limit: number
  } | {} | ApiError[] | any[];
}
