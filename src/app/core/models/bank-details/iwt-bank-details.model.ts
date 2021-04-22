import { BankDetailsInterface } from '@interfaces/bank-details/bank-details.interface';
import { BeneficiaryCustomerInterface } from '@interfaces/bank-details/beneficiary-customer.interface';
import { BankDetailsModel } from '@models/bank-details/bank-details.model';
import { BeneficiaryCustomerModel } from '@models/bank-details/beneficiary-customer.model';
import { IwtBankDetailsInterface } from '@interfaces/bank-details/iwt-bank-details.interface';

export class IwtBankDetailsModel implements IwtBankDetailsInterface {
  id: number;
  createdAt: string;
  updatedAt: string;
  currencyCode: string;
  isIwtEnabled: boolean;
  beneficiaryBankDetails: BankDetailsInterface;
  beneficiaryBankDetailsId: number;
  beneficiaryCustomer: BeneficiaryCustomerInterface;
  beneficiaryCustomerId: number;
  intermediaryBankDetails: BankDetailsInterface;
  intermediaryBankDetailsId: number;
  additionalInstructions: string;

  public constructor(params: any) {
    if (params.beneficiaryBankDetails) {
      this.beneficiaryBankDetails = new BankDetailsModel(params.beneficiaryBankDetails);
      delete params.beneficiaryBankDetails;
    }

    if (params.intermediaryBankDetails) {
      this.intermediaryBankDetails = new BankDetailsModel(params.intermediaryBankDetails);
      delete params.intermediaryBankDetails;
    }

    if (params.beneficiaryCustomer) {
      this.beneficiaryCustomer = new BeneficiaryCustomerModel(params.beneficiaryCustomer);
      delete params.beneficiaryCustomer;
    }

    Object.assign(this, params);
  }
}
