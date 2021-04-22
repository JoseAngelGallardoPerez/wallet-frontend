import { BankDetailsInterface } from '@interfaces/bank-details/bank-details.interface';
import { BeneficiaryCustomerInterface } from '@interfaces/bank-details/beneficiary-customer.interface';

export interface IwtBankDetailsInterface {
  id: number;
  createdAt: string;
  updatedAt: string;
  currencyCode: string;
  isIwtEnabled: boolean;
  beneficiaryBankDetails: BankDetailsInterface;
  beneficiaryBankDetailsId: number;
  beneficiaryCustomer: BeneficiaryCustomerInterface;
  beneficiaryCustomerId: number;
  intermediaryBankDetails?: BankDetailsInterface;
  intermediaryBankDetailsId: number;
  additionalInstructions: string;
}
