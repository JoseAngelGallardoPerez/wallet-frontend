import { CurrencyAmount } from '../currency-amount';
import { Transaction } from '../transaction';

export class AdditionalDetailField {
  constructor(public name: string, public value: string) {
  }
}

export class AdditionalDetail {
  constructor(public title: string, public fields: AdditionalDetailField[]) {
  }
}

export class SystemDetails {
  public id: string;
  public createdAt: string;
  public statusChangedAt: string;
  public updatedAt: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public username: string;
  public status: string;
  public reason: string;
  public subject: string;
  public isInitiatedBySystem: boolean;

  public getFullName(): string {
    return `${ this.firstName } ${ this.lastName }`;
  }

  public humanId(): string {
    const fullName = `${this.firstName.trim()} ${this.lastName.trim()}`.trim();
    if (fullName) {
      return `${fullName} ( ${this.email} )`;
    }

    return this.email;
  }
}

export class TransferDetails {
  public amount: CurrencyAmount;
  public baseCurrencyCode: string;
  public description: string;
  public fee: CurrencyAmount;
  public rate: CurrencyAmount;
}

export class TransferRequestData {
  public systemDetails: SystemDetails;
  public transferDetails: TransferDetails;
  public additionalDetails: AdditionalDetail[];
  public transactions: Transaction[];
}
