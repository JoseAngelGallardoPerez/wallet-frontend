import { RequestDataProcessor } from '@services/transfer/request-data/request-data-processor';
import { CurrencyAmount } from '@models/currency-amount';
import { OWT_OUTGOING_PURPOSE } from '@app/core/constants/transaction-purposes';
import { AdditionalDetail, AdditionalDetailField } from '@models/transfers/transfer-request-data';
import { CommonRequestProcessor } from '@services/transfer/request-data/common-request-processor';

export class OwtRequestDataProcessor implements RequestDataProcessor {
  private commonRequestProcessor: CommonRequestProcessor;

  constructor(private fullData: any) {
    this.commonRequestProcessor = new CommonRequestProcessor(fullData);
  }

  public getRequestAmount(): CurrencyAmount {
    const amount = (parseFloat(this.fullData.request.request.amount) / parseFloat(this.getRate().amount)).toString();
    return new CurrencyAmount(this.fullData.request.request.referenceCurrencyCode, amount);
  }

  public getCurrencyCode(): string {
    // return this.commonRequestProcessor.getCurrencyCodeByPurpose(OWT_OUTGOING_PURPOSE);
    return this.fullData.request.request.referenceCurrencyCode;
  }

  public getRate(): CurrencyAmount {
    return new CurrencyAmount(this.fullData.request.request.baseCurrencyCode, this.fullData.request.request.rate);
  }

  public getAdditionalDetails(): AdditionalDetail[] {
    const additionalData = this.fullData.data;
    return [
      new AdditionalDetail(
        'Debit from Account',
        [new AdditionalDetailField('Account Number', this.getAccountFromNumber())]
      ),
      new AdditionalDetail(
        'Beneficiary Bank',
        [
          new AdditionalDetailField('SWIFT/BIC', additionalData.bankDetails.swiftCode),
          new AdditionalDetailField('Name', additionalData.bankDetails.bankName),
          new AdditionalDetailField('Address', additionalData.bankDetails.address),
          new AdditionalDetailField('Location', additionalData.bankDetails.location),
          new AdditionalDetailField('Country', additionalData.bankDetails.country.code),
          new AdditionalDetailField('ACC/IBAN', additionalData.bankDetails.iban),
          new AdditionalDetailField('ABA/RTN', additionalData.bankDetails.abaNumber),
        ]
      ),
      new AdditionalDetail('Intermediary Bank',
        additionalData.intermediaryBankDetails ?
        [
          new AdditionalDetailField('SWIFT/BIC', additionalData.intermediaryBankDetails.swiftCode),
          new AdditionalDetailField('Name', additionalData.intermediaryBankDetails.bankName),
          new AdditionalDetailField('Address', additionalData.intermediaryBankDetails.address),
          new AdditionalDetailField('Location', additionalData.intermediaryBankDetails.location),
          new AdditionalDetailField('Country', additionalData.intermediaryBankDetails.country.code),
          new AdditionalDetailField('ACC/IBAN', additionalData.intermediaryBankDetails.iban),
          new AdditionalDetailField('ABA/RTN', additionalData.intermediaryBankDetails.abaNumber),
        ] :
        []),
      new AdditionalDetail(
        'Beneficiary Customer',
        [
          new AdditionalDetailField('Name', additionalData.beneficiaryCustomer.accountName),
          new AdditionalDetailField('Address', additionalData.beneficiaryCustomer.address),
          new AdditionalDetailField('ACC/IBAN', additionalData.beneficiaryCustomer.iban),
        ]
      ),
      new AdditionalDetail(
        'Additional Information',
        [
          new AdditionalDetailField('Ref. Message', additionalData.refMessage),
        ]
      ),
    ];
  }

  private getAccountFromNumber(): string {
    return this.commonRequestProcessor.getAccountNumberByPurpose(OWT_OUTGOING_PURPOSE);
  }
}
