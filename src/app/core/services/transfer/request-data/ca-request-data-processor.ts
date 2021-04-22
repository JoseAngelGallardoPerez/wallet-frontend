import { RequestDataProcessor } from '@services/transfer/request-data/request-data-processor';
import { CurrencyAmount } from '@models/currency-amount';
import { CA_PURPOSE } from '@app/core/constants/transaction-purposes';
import { AdditionalDetail, AdditionalDetailField } from '@models/transfers/transfer-request-data';
import { CommonRequestProcessor } from '@services/transfer/request-data/common-request-processor';

export class CaRequestDataProcessor implements RequestDataProcessor {
  private commonRequestProcessor: CommonRequestProcessor;

  constructor(private fullData: any) {
    this.commonRequestProcessor = new CommonRequestProcessor(fullData);
  }

  public getRequestAmount(): CurrencyAmount {
    return new CurrencyAmount(this.getCurrencyCode(), this.fullData.request.request.amount);
  }

  public getCurrencyCode(): string {
    return this.commonRequestProcessor.getCurrencyCodeByPurpose(CA_PURPOSE);
  }

  public getRate(): CurrencyAmount {
    const currencyCode = this.commonRequestProcessor.getCurrencyCodeByPurpose(CA_PURPOSE);
    return new CurrencyAmount(currencyCode, this.fullData.request.request.rate);
  }

  public getAdditionalDetails(): AdditionalDetail[] {
    return [
      new AdditionalDetail(
        'Debit from Account',
        [new AdditionalDetailField('Account Number', 'Revenue')]
      ),
      new AdditionalDetail(
        'Credit to Account',
        [new AdditionalDetailField('Account Number', this.getAccountToNumber())]
      ),
    ];
  }

  private getAccountToNumber(): string {
    return this.commonRequestProcessor.getAccountNumberByPurpose(CA_PURPOSE);
  }
}
