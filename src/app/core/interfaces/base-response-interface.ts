export interface IBaseResponse<T> {
  data: T;
  status: number;
  error: boolean;
}
