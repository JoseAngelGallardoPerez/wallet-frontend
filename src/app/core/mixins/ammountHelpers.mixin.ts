import { Constructor } from '@app/modules/transfer/components/shared/amountDetails.mixin';

export function AmountHelpersMixin<TBase extends Constructor<{}>>(Base: TBase) {
  return class extends Base {

    public amountWithoutComma(amount: string): string {
      return amount.replace(/,/g, '');
    }

    public amountIsPositive(amount: string): boolean {
      return parseFloat(this.amountWithoutComma(amount)) >= 0;
    }
  };
}
