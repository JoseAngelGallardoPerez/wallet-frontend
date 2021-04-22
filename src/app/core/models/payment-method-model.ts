import { PaymentMethodInterface } from '@interfaces/payment-method-interface';

export class PaymentMethodModel implements PaymentMethodInterface {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;

public constructor(params: any) {
    Object.assign(this, params);
  }
}
