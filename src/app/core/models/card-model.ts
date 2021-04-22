import { CardInterface } from '@interfaces/card-interface';
import { CardTypeInterface } from '@interfaces/card-type-interface';
import { IUser } from '@interfaces/user-interface';

export class CardModel implements CardInterface {
  id: number;
  number: string;
  numberFormat?: string;
  status: string;
  balance: number;
  cardTypeId: number;
  cardType: CardTypeInterface;
  userId: string;
  user: IUser;
  expirationYear: number;
  expirationMonth: number;
  createdAt: string;
  updatedAt: string;

  public constructor(params: any) {
    Object.assign(this, params);

    // Dirty hack! I am so sorry ;(
    if (this.user && !this.user.humanId) {
      this.user.humanId = function () {
        const fullName = `${this.firstName.trim()} ${this.lastName.trim()}`.trim();
        if (fullName) {
          return `${fullName} ( ${this.email} )`;
        }

        return this.email;
      };
    }
  }
}
