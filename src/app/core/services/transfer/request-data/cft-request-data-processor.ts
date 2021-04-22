import { RequestDataProcessor } from '@services/transfer/request-data/request-data-processor';
import { CurrencyAmount } from '@models/currency-amount';
import {
  CFT_OUTGOING_PURPOSE,
  CFT_INCOMING_PURPOSE
} from '@app/core/constants/transaction-purposes';
import { AdditionalDetail, AdditionalDetailField } from '@models/transfers/transfer-request-data';
import { CommonRequestProcessor } from '@services/transfer/request-data/common-request-processor';

export class CftRequestDataProcessor implements RequestDataProcessor {
  private commonRequestProcessor: CommonRequestProcessor;

  constructor(private fullData: any) {
    this.commonRequestProcessor = new CommonRequestProcessor(fullData);
  }

  public getRequestAmount(): CurrencyAmount {
    return new CurrencyAmount(this.getCurrencyCode(), this.fullData.request.request.amount);
  }

  public getCurrencyCode(): string {
    return this.commonRequestProcessor.getCurrencyCodeByPurpose(CFT_OUTGOING_PURPOSE);
  }

  public getRate(): CurrencyAmount {
    const transaction = this.commonRequestProcessor.getTransaction(CFT_INCOMING_PURPOSE);
    return new CurrencyAmount(transaction.card.currencyCode, this.fullData.request.request.rate);
  }

  public getAdditionalDetails(): AdditionalDetail[] {
    return [
      new AdditionalDetail(
        'Debit from Account',
        [new AdditionalDetailField('Account Number', this.getAccountFromNumber())]
      ),
      new AdditionalDetail(
        'Credit to Card',
        [new AdditionalDetailField('Card Number', this.getAccountToCard())]
      ),
    ];
  }

  private getAccountFromNumber(): string {
    return this.commonRequestProcessor.getAccountNumberByPurpose(CFT_OUTGOING_PURPOSE);
  }

  private getAccountToCard(): string {
    const transaction = this.commonRequestProcessor.getTransaction(CFT_INCOMING_PURPOSE);
    return transaction.card.number;
  }
}
