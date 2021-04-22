import { ApiError } from '@models/api-error.model';

export interface DataJobsInterface {
  data: JobsInterface;
}

export interface JobsInterface {
  uid: string;
  status: string; //  Enum:    [ processing, completed, failed ];
  name: string;
  createdAt: string;
  updatedAt: string;
  result: {
    data?: any;
    errors?: ApiError[];
  };
}
