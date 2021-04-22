import { UserAccountComponent } from '@lib/modules/user-account/components/user-account/user-account.component';
import { AccountsResolver } from '@resolvers/accounts.resolver';
import { TransactionResolver } from '@lib/modules/user-account/services/transaction.resolver';
import { UserViewTransactionComponent } from '@lib/modules/user-account/components/user-view-transaction/user-view-transaction.component';

export const DefaultUserAccountRouting = [

  {
    path: '',
    pathMatch: 'full',
    data: { crumbs: 'Accounts' },
    component: UserAccountComponent,
    resolve: {
      accounts: AccountsResolver,
    }
  },
  {
    path: 'transaction-view/:id',
    data: { crumbs: 'Transaction Details' },
    component: UserViewTransactionComponent,
    resolve: {
      transactionData: TransactionResolver,
    }
  },
];
