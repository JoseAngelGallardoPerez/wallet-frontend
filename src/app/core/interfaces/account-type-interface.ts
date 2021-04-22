import { CurrencyInterface } from './currency-interface';
import { PaymentMethodInterface } from './payment-method-interface';
import { PaymentPeriodInterface } from './payment-period-interface';

export interface AccountTypeInterface {
  id: number;
  name: string;
  monthlyMaintenanceFee: number | string;
  createdAt: string;
  updatedAt: string;
  code: string;
  currency: CurrencyInterface;
  currencyId: number;

  autoNumberGeneration: boolean;
  numberPrefix: string;

  balanceFeeAmount: number | string;
  balanceChargeDay: number;
  balanceLimitAmount: number | string;

  creditAnnualInterestRate: number | string;
  creditChargeDay: number;
  creditChargeMonth: number;
  creditChargePeriod: PaymentPeriodInterface;
  creditChargePeriodId: number;
  creditLimitAmount: number | string;
  creditPayoutMethod: PaymentMethodInterface;
  creditPayoutMethodId: number;

  currencyCode: string;
  depositAnnualInterestRate: number | string;
  depositPayoutDay: number;
  depositPayoutMonth: number;
  depositPayoutMethod: PaymentMethodInterface;
  depositPayoutMethodId: number;
  depositPaymentPeriod: PaymentPeriodInterface;
  depositPayoutPeriodId: number;

  title: string;

  providerCode?: string;

}
