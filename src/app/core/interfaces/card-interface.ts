import { CardTypeInterface } from '@interfaces/card-type-interface';
import { IUser } from '@interfaces/user-interface';

export interface CardInterface {
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
}
