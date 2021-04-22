import { CurrencyAmount } from '@models/currency-amount';
import { AdditionalDetail } from '@models/transfers/transfer-request-data';

export interface RequestDataProcessor {
  getRequestAmount(): CurrencyAmount;
  getCurrencyCode(): string;
  getRate(): CurrencyAmount;
  getAdditionalDetails(): AdditionalDetail[];
}
