import { AccountTypeInterface } from '@interfaces/account-type-interface';
import { CurrencyInterface } from '@interfaces/currency-interface';
import { PaymentMethodInterface } from '@interfaces/payment-method-interface';
import { PaymentPeriodInterface } from '@interfaces/payment-period-interface';

export class AccountTypeModel implements AccountTypeInterface {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  code: string;
  currencyCode: string;
  currency: CurrencyInterface;
  currencyId: number;
  balanceFeeAmount: number;
  balanceChargeDay: number;
  balanceLimitAmount: number;
  creditLimitAmount: number;
  creditAnnualInterestRate: number;
  creditPayoutMethod: PaymentMethodInterface;
  creditPayoutMethodId: number;
  creditChargePeriod: PaymentPeriodInterface;
  creditChargePeriodId: number;
  creditChargeDay: number;
  creditChargeMonth: number;
  depositAnnualInterestRate: number;
  depositPayoutMethod: PaymentMethodInterface;
  depositPayoutMethodId: number;
  depositPaymentPeriod: PaymentPeriodInterface;
  depositPayoutPeriodId: number;
  depositPayoutDay: number;
  depositPayoutMonth: number;
  autoNumberGeneration: boolean;
  numberPrefix: string;
  monthlyMaintenanceFee: number;

  prefixStatus: boolean;
  interestGeneratingStatus: boolean;
  lineOfCreditStatus: boolean;
  minimumBalanceStatus: boolean;
  monthlyMaintenanceStatus: boolean;

  title: string;

  public constructor(params: any) {
    Object.assign(this, params);
    this.monthlyMaintenanceFee = params.monthlyMaintenanceFee ? parseFloat(params.monthlyMaintenanceFee) : null;
    this.balanceLimitAmount = params.balanceLimitAmount ? parseFloat(params.balanceLimitAmount) : null;
    this.balanceFeeAmount = params.balanceFeeAmount ? parseFloat(params.balanceFeeAmount) : null;
    this.balanceChargeDay = params.balanceChargeDay ? parseInt(params.balanceChargeDay, 10) : null;
    this.creditLimitAmount = params.creditLimitAmount ? parseFloat(params.creditLimitAmount) : null;
    this.creditAnnualInterestRate = params.creditAnnualInterestRate ? parseFloat(params.creditAnnualInterestRate) : null;
    this.creditPayoutMethodId = params.creditPayoutMethodId ? parseInt(params.creditPayoutMethodId, 10) : null;
    this.creditChargePeriodId = params.creditChargePeriodId ? parseInt(params.creditChargePeriodId, 10) : null;
    this.creditChargeDay = params.creditChargeDay ? parseInt(params.creditChargeDay, 10) : null;
    this.depositAnnualInterestRate = params.depositAnnualInterestRate ? parseFloat(params.depositAnnualInterestRate) : null;
    this.depositPayoutMethodId = params.depositPayoutMethodId ? parseInt(params.depositPayoutMethodId, 10) : null;
    this.depositPayoutPeriodId = params.depositPayoutPeriodId ? parseInt(params.depositPayoutPeriodId, 10) : null;
    this.depositPayoutDay = params.depositPayoutDay ? parseInt(params.depositPayoutDay, 10) : null;

    this.prefixStatus = this.numberPrefix !== null && this.numberPrefix !== undefined && this.numberPrefix !== '';
    this.interestGeneratingStatus = this.depositAnnualInterestRate !== null;
    this.lineOfCreditStatus = this.creditAnnualInterestRate !== null;
    this.minimumBalanceStatus = this.balanceFeeAmount !== null;
    this.monthlyMaintenanceStatus = this.monthlyMaintenanceFee !== null;

    this.title = params.name + ' - ' + params.currencyCode;
  }
}
