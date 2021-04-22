import { BeneficiaryCustomerInterface } from '@interfaces/bank-details/beneficiary-customer.interface';

export class BeneficiaryCustomerModel implements BeneficiaryCustomerInterface {
  id: number;
  createdAt: string;
  updatedAt: string;
  accountName: string;
  address: string;
  iban: string;

  public constructor(params: any) {
    Object.assign(this, params);
  }
}
