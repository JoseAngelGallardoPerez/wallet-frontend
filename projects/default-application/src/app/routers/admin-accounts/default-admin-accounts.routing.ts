import { UserPermissionGuard } from '@guards/user-permission.guard';
import { UserPermissions } from '@constants/userPermissions';
import { CurrenciesFilter } from '@resolvers/currency/currencies.resolver';
import { DatepickerBaseOptionsResolver } from '@resolvers/datepickerBaseOptions.resolver';
import { AccountsCardsGuard } from '@guards/accounts/cards.guard';
import { CreateNewCardComponent } from '@app/modules/admin-accounts/components/cards/create-new-card/create-new-card.component';
import { EditCardComponent } from '@app/modules/admin-accounts/components/cards/edit-card/edit-card.component';
import { AccountsComponent } from '@app/modules/admin-accounts/components/accounts.component';
import { AccountsListComponent } from '@app/modules/admin-accounts/components/accounts/accounts-list/accounts-list.component';
import { CreateNewAccountComponent } from '@app/modules/admin-accounts/components/accounts/create-new-account/create-new-account.component';
import { EditAccountComponent } from '@app/modules/admin-accounts/components/accounts/edit-account/edit-account.component';
import { AccountDebitComponent } from '@app/modules/admin-accounts/components/accounts/account-debit/account-debit.component';
import { AccountCreditComponent } from '@app/modules/admin-accounts/components/accounts/account-credit/account-credit.component';
import { CardsListComponent } from '@app/modules/admin-accounts/components/cards/cards-list/cards-list.component';
import { RevenueListComponent } from '@app/modules/admin-accounts/components/revenue/revenue-list/revenue-list.component';
import { DeductFromRevenueComponent } from '@app/modules/admin-accounts/components/revenue/deduct-from-revenue/deduct-from-revenue.component';
import { AccountResolver } from '@app/modules/admin-accounts/resolvers/account.resolver';
import { CardResolver } from '@app/modules/admin-accounts/resolvers/card.resolver';
import { RevenueAccountResolver } from '@app/modules/admin-accounts/resolvers/revenue-account.resolver';
import { UserCurrenciesResolver } from '@app/modules/shared/currency/resolvers/user-currencies.resolver';
import { ViewEditCardComponent } from '@lib/modules/admin-accounts/components/cards/view-edit-card/view-edit-card.component';
import { AdminViewCardComponent } from '@lib/modules/admin-accounts/components/cards/admin-view-card/admin-view-card.component';
import { ViewEditAccountComponent } from '@lib/modules/admin-accounts/components/accounts/view-edit-account/view-edit-account.component';
import { ViewAccountComponent } from '@lib/modules/admin-accounts/components/accounts/view-account/view-account.component';
import { NoPermissionComponent } from '@layouts/error/no-permission/no-permission.component';

export const DefaultAdminAccountsRouting = [

  {
    path: '',
    component: AccountsComponent,
    data: {
      crumbs: 'Accounts'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'accounts',
      },
      {
        path: 'accounts',
        children: [
          {
            path: '',
            component: AccountsListComponent,
            canActivate: [UserPermissionGuard],
            data: {
              showTabs: true,
              currenciesFilters: CurrenciesFilter.Active,
              permissions: [UserPermissions.VIEW_ACCOUNT],
              redirectTo: '/admin/accounts/accounts/no-permission'
            },
            resolve: {
              currencies: UserCurrenciesResolver,
            },
          },
          {
            path: 'create',
            component: CreateNewAccountComponent,
            canActivate: [UserPermissionGuard],
            data: {
              permissions: [UserPermissions.CREATE_ACCOUNT],
              redirectTo: '/admin/accounts/no-permission'
            },
            resolve: {
              datepickerOptions: DatepickerBaseOptionsResolver
            },
          },
          {
            path: 'edit/:id',
            component: ViewEditAccountComponent,
            resolve: {
              account: AccountResolver,
            },
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: ViewAccountComponent,
                resolve: {
                  datepickerOptions: DatepickerBaseOptionsResolver
                }
              },
              {
                path: 'edit',
                pathMatch: 'full',
                component: EditAccountComponent,
                canActivate: [UserPermissionGuard],
                data: {
                  permissions: [UserPermissions.MODIFY_ACCOUNTS]
                },
                resolve: {
                  datepickerOptions: DatepickerBaseOptionsResolver
                }
              },
            ]
          },
          {
            path: 'debit/:id',
            component: AccountDebitComponent,
            canActivate: [UserPermissionGuard],
            data: {
              permissions: [UserPermissions.MANUAL_DEBIT_CREDIT_ACCOUNT]
            },
            resolve: {
              account: AccountResolver,
            }
          },
          {
            path: 'credit/:id',
            component: AccountCreditComponent,
            canActivate: [UserPermissionGuard],
            data: {
              permissions: [UserPermissions.MANUAL_DEBIT_CREDIT_ACCOUNT],
            },
            resolve: {
              account: AccountResolver,
            }
          },
          {
            path: 'no-permission',
            component: NoPermissionComponent,
            data: {
              showTabs: true,
            },
          },
        ]
      },

      {
        path: 'cards',
        canActivate: [AccountsCardsGuard],
        children: [
          {
            path: '',
            component: CardsListComponent,
            canActivate: [UserPermissionGuard],
            data: {
              showTabs: true,
              currenciesFilters: CurrenciesFilter.Active,
              permissions: [UserPermissions.VIEW_CARDS],
              redirectTo: '/admin/accounts/cards/no-permission',
            },
            resolve: {
              currencies: UserCurrenciesResolver,
            },
          },
          {
            path: 'create',
            component: CreateNewCardComponent,
            canActivate: [UserPermissionGuard],
            data: {
              crumbs: 'Create New Card',
              permissions: [UserPermissions.CREATE_CARDS],
              redirectTo: '/admin/accounts/no-permission',
            },
          },
          {
            path: 'edit/:id',
            component: ViewEditCardComponent,
            resolve: {
              card: CardResolver,
            },
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: AdminViewCardComponent,
              },
              {
                path: 'edit',
                pathMatch: 'full',
                component: EditCardComponent,
                canActivate: [UserPermissionGuard],
                data: {
                  permissions: [UserPermissions.MODIFY_CARDS],
                  redirectTo: '/admin/accounts/cards/no-permission',
                },
              },
            ],
            data: {
              crumbs: 'Card Details',
            },
          },
          {
            path: 'no-permission',
            component: NoPermissionComponent,
            data: {
              showTabs: true,
            },
          },
        ]
      },

      {
        path: 'revenue',
        children: [
          {
            path: '',
            component: RevenueListComponent,
            canActivate: [UserPermissionGuard],
            data: {
              showTabs: true,
              permissions: [UserPermissions.VIEW_REVENUE],
              redirectTo: '/admin/accounts/revenue/no-permission',
            },
          },
          {
            path: 'deduct/:id',
            canActivate: [UserPermissionGuard],
            data: {
              permissions: [UserPermissions.MANAGE_REVENUE],
              redirectTo: '/admin/accounts/no-permission',
            },
            component: DeductFromRevenueComponent,
            resolve: {
              revenueAccount: RevenueAccountResolver
            }
          },
          {
            path: 'no-permission',
            component: NoPermissionComponent,
            data: {
              showTabs: true,
            },
          },
        ]
      }
    ]
  },
  {
    path: 'no-permission',
    component: NoPermissionComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
