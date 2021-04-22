export class CommonRequestProcessor {
  constructor(private fullData: any) {}

  public getTransaction(purpose: string): any {
    return this.fullData.transactions.find(e => e.transaction.purpose === purpose);
  }

  public getAccountNumberByPurpose(purpose: string): string {
    const transaction = this.getTransaction(purpose);
    return transaction.account.account.number;
  }

  public getCurrencyCodeByPurpose(purpose: string): string {
    const transaction = this.getTransaction(purpose);
    return transaction.account.account.currencyCode;
  }
}
