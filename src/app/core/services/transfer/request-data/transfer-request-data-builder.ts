import { SystemDetails, TransferDetails, TransferRequestData } from '@models/transfers/transfer-request-data';
import { RequestDataProcessor } from '@services/transfer/request-data/request-data-processor';
import { CurrencyAmount } from '@models/currency-amount';
import { CFT_INCOMING_PURPOSE, FEE_PURPOSE, REVENUE_PURPOSES } from '@app/core/constants/transaction-purposes';
import { SUBJECT_CA, SUBJECT_CFT, SUBJECT_DA, SUBJECT_OWT, SUBJECT_TBA, SUBJECT_TBU } from '@app/core/constants/request-subjects';
import { TbaRequestDataProcessor } from '@services/transfer/request-data/tba-request-data-processor';
import { TbuRequestDataProcessor } from '@services/transfer/request-data/tbu-request-data-processor';
import { OwtRequestDataProcessor } from '@services/transfer/request-data/owt-request-data-processor';
import { CaRequestDataProcessor } from '@services/transfer/request-data/ca-request-data-processor';
import { DaRequestDataProcessor } from '@services/transfer/request-data/da-request-data-processor';
import { Transaction } from '@models/transaction';
import { CftRequestDataProcessor } from '@services/transfer/request-data/cft-request-data-processor';

export class TransferRequestDataBuilder {
  private requestDataProcessor: RequestDataProcessor;

  private static getTransactionAccount(transaction: any): string {
    if (TransferRequestDataBuilder.isRevenueTransaction(transaction)) {
      return 'Revenue';
    }

    if (transaction.transaction.purpose === CFT_INCOMING_PURPOSE) {
      return `Card ${ transaction.card.number }`;
    }

    return transaction.account && transaction.account.account.number;
  }

  private static isRevenueTransaction(transaction: any): boolean {
    return REVENUE_PURPOSES.includes(transaction.transaction.purpose);
  }

  private static getTransactionCurrencyCode(transaction: any): string {
    if (TransferRequestDataBuilder.isRevenueTransaction(transaction)) {
      return transaction.revenueAccount.revenueAccount.currencyCode;
    }

    if (transaction.transaction.purpose === CFT_INCOMING_PURPOSE) {
      return transaction.card.currencyCode;
    }

    return transaction.account && transaction.account.account.currencyCode;
  }

  constructor(private fullData: any) {
    this.requestDataProcessor = this.getDataProcessor();
  }

  public call(): TransferRequestData {
    const obj = new TransferRequestData();
    obj.systemDetails = this.getSystemDetails();
    obj.transferDetails = this.getTransferDetails();
    obj.additionalDetails = this.requestDataProcessor.getAdditionalDetails();
    obj.transactions = this.getTransactions();
    return obj;
  }

  private getSystemDetails(): SystemDetails {
    const details = new SystemDetails();
    const request = this.fullData.request;
    const sourceAccount = this.fullData.sourceAccount;

    details.id = request.request.id;
    details.createdAt = request.request.createdAt;
    details.updatedAt = request.request.updatedAt;
    details.statusChangedAt = request.request.statusChangedAt;
    details.firstName = sourceAccount && sourceAccount.user && sourceAccount.user.firstName || '';
    details.lastName = sourceAccount && sourceAccount.user && sourceAccount.user.lastName || '';
    details.username = sourceAccount && sourceAccount.user && sourceAccount.user.username || '';
    details.email = sourceAccount && sourceAccount.user && sourceAccount.user.email || '';
    details.status = request.request.status;
    details.reason = request.request.cancellationReason;
    details.subject = request.request.subject;
    details.isInitiatedBySystem = request.request.isInitiatedBySystem;

    return details;
  }

  private getTransferDetails(): TransferDetails {
    const details = new TransferDetails();

    details.amount = this.requestDataProcessor.getRequestAmount();
    details.baseCurrencyCode = this.requestDataProcessor.getCurrencyCode();
    details.description = this.fullData.request.request.description;
    details.fee = this.getFee();
    details.rate = this.requestDataProcessor.getRate();

    return details;
  }

  private getFee(): CurrencyAmount {
    const foundTransaction = this.fullData.transactions.find(e => e.transaction.purpose === FEE_PURPOSE);
    if (foundTransaction) {
      const amount = Math.abs(foundTransaction.transaction.amount).toString();
      return new CurrencyAmount(foundTransaction.account.account.currencyCode, amount);
    }
    return null;
  }

  private getDataProcessor(): RequestDataProcessor {
    switch (this.fullData.request.request.subject) {
      case SUBJECT_TBA: {
        return new TbaRequestDataProcessor(this.fullData);
      }
      case SUBJECT_TBU: {
        return new TbuRequestDataProcessor(this.fullData);
      }
      case SUBJECT_OWT: {
        return new OwtRequestDataProcessor(this.fullData);
      }
      case SUBJECT_CA: {
        return new CaRequestDataProcessor(this.fullData);
      }
      case SUBJECT_DA: {
        return new DaRequestDataProcessor(this.fullData);
      }
      case SUBJECT_CFT: {
        return new CftRequestDataProcessor(this.fullData);
      }
    }
  }

  private getTransactions(): Transaction[] {
    return this.fullData.transactions.map(e => {
      return new Transaction({
        id: e.transaction.id,
        description: e.transaction.description,
        amount: e.transaction.amount,
        status: e.transaction.status,
        createdAt: e.transaction.createdAt,
        statusChangedAt: this.fullData.request.request.statusChangedAt,
        account: TransferRequestDataBuilder.getTransactionAccount(e),
        currencyCode: TransferRequestDataBuilder.getTransactionCurrencyCode(e),
      });
    });
  }
}
