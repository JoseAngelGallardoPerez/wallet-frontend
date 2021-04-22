import { PaymentPeriodInterface } from '@interfaces/payment-period-interface';

export class PaymentPeriodModel implements PaymentPeriodInterface {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;

  public constructor(params: any) {
    Object.assign(this, params);
  }
}
