import { AccountInterface } from '@interfaces/account-interface';
import { TransferAccountName } from '@enums/transfer-account-name.enum';

export interface IAccountSelectEmitter {
  account: AccountInterface;
  name: TransferAccountName;
}
