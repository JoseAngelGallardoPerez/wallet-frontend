import { RequestInterface } from '@interfaces/request.interface';

export class RequestModel implements RequestInterface {
  id: number;
  amount: number;

  public constructor(params: any) {
    Object.assign(this, params);
  }
}
