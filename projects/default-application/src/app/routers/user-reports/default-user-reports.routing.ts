import { AccountsResolver } from '@resolvers/accounts.resolver';
import { UserReportsComponent } from '@app/modules/user-reports/components/user-reports.component';
import { SpecificAccountStatementComponent } from '@app/modules/user-reports/components/specific-account-statement/specific-account-statement.component';
import { AllAccountsTransactionsComponent } from '@app/modules/user-reports/components/all-accounts-transactions/all-accounts-transactions.component';
import { AllAccountsBalancesComponent } from '@app/modules/user-reports/components/all-accounts-balances/all-accounts-balances.component';

export const DefaultUserReportsRouting = [
  {
    path: '',
    component: UserReportsComponent,
    data: {
      crumbs: 'Reports',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'specific-account-statement',
      },
      {
        path: 'specific-account-statement',
        component: SpecificAccountStatementComponent,
        resolve: {
          accounts: AccountsResolver,
        },
        data: {
          crumbs: 'Specific account statement'
        }
      },
      {
        path: 'all-accounts-transactions',
        component: AllAccountsTransactionsComponent,
        data: {
          crumbs: 'All Accounts Transactions',
        },
      },
      {
        path: 'all-accounts-balances',
        component: AllAccountsBalancesComponent,
        data: {
          crumbs: 'All Accounts Balances',
        },
      }
    ]
  },
];
