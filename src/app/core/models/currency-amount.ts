export class CurrencyAmount {
  constructor(public code: string, public amount: string) {}

  public toString(): string {
    return `${this.amount} ${this.code}`;
  }
}
