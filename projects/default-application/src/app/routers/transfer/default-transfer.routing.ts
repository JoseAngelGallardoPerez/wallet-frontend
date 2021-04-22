// tslint:disable:max-line-length

import { UserTbuComponent } from '@lib/modules/transfer/components/transfer-between-users/user-tbu/user-tbu.component';
import { UserRoleGuard } from '@guards/user-role.guard';
import { OwtTemplateResolver } from '@lib/modules/transfer/resolvers/owtTemplate.resolver';
import { AdminRoleGuard } from '@guards/admin-role.guard';
import { UserPermissionGuard } from '@guards/user-permission.guard';
import { TransferComponent } from '@lib/modules/transfer/components/transfer.component';
import { AdminSccComponent } from '@lib/modules/transfer/components/buy-sell-crypto-currency/admin/admin-scc/admin-scc.component';
import { AccountsCardsGuard } from '@guards/accounts/cards.guard';
import { UserTbaComponent } from '@lib/modules/transfer/components/transfer-between-accounts/user-tba/user-tba.component';
import { TbuTemplateResolver } from '@lib/modules/transfer/resolvers/tbuTemplate.resolver';
import { CftTemplateResolver } from '@lib/modules/transfer/resolvers/cftTemplate.resolver';
import { AccountsResolver } from '@resolvers/accounts.resolver';
import { UserBccComponent } from '@lib/modules/transfer/components/buy-sell-crypto-currency/user/user-bcc/user-bcc.component';
import { AdminBccComponent } from '@lib/modules/transfer/components/buy-sell-crypto-currency/admin/admin-bcc/admin-bcc.component';
import { TbuTanSettingsResolver } from '@lib/modules/transfer/resolvers/tbuTanSettings.resolver';
import { GeneralOwtTransferComponent } from '@lib/modules/transfer/components/outgoing-wire-transfer/user-owt/general-owt-transfer/general-owt-transfer.component';
import { UserPermissions } from '@constants/userPermissions';
import { AdminTbaComponent } from '@lib/modules/transfer/components/transfer-between-accounts/admin-tba/admin-tba.component';
import { TbaTanSettingsResolver } from '@lib/modules/transfer/resolvers/tbaTanSettings.resolver';
import { CftTanSettingsResolver } from '@lib/modules/transfer/resolvers/cftTanSettings.resolver';
import { CardsForUserResolver } from '@shared-modules/cards/resolvers/cards-for-user.resolver';
import { AdminGeneralOwtComponent } from '@lib/modules/transfer/components/outgoing-wire-transfer/admin-owt/admin-general-owt/admin-general-owt.component';
import { CountriesResolver } from '@shared-modules/countries/resolvers/countries.resolver';
import { AdminTbuComponent } from '@lib/modules/transfer/components/transfer-between-users/admin-tbu/admin-tbu.component';
import { CurrenciesFilter } from '@resolvers/currency/currencies.resolver';
import { OwtTanSettingsResolver } from '@lib/modules/transfer/resolvers/owtTanSettings.resolver';
import { UserCurrenciesResolver } from '@shared-modules/currency/resolvers/user-currencies.resolver';
import { CardFundingTransferComponent } from '@lib/modules/transfer/components/card-funding-transfer/card-funding-transfer.component';
import { UserIwtComponent } from '@lib/modules/transfer/components/incoming-wire-transfer/user-iwt/user-iwt.component';
import { UserSccComponent } from '@lib/modules/transfer/components/buy-sell-crypto-currency/user/user-scc/user-scc.component';
import { AccountsWithIwtInstructionsAvailableResolver } from '@resolvers/accounts-with-iwt-instructions-available.resolver';
import { NoPermissionComponent } from '@layouts/error/no-permission/no-permission.component';

export const DefaultTransferRouting = [

  {
    path: '',
    pathMatch: 'full',
    component: TransferComponent,
    data: {
      crumbs: 'Transfers',
    },
    resolve: {
      accountsForIwt: AccountsWithIwtInstructionsAvailableResolver
    }
  },
  {
    path: '',
    canActivate: [UserRoleGuard],
    children: [
      {
        path: 'transfer-between-accounts',
        component: UserTbaComponent,
        data: {
          crumbs: 'Transfer Between Accounts',
        },
        resolve: {
          accounts: AccountsResolver,
          tansRequired: TbaTanSettingsResolver
        }
      },
      {
        path: 'transfer-between-users',
        component: UserTbuComponent,
        resolve: {
          accounts: AccountsResolver,
          tansRequired: TbuTanSettingsResolver,
          templates: TbuTemplateResolver
        },
        data: {
          crumbs: 'Transfer Between Users',
        },
      },
      {
        path: 'outgoing-wire-transfer',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'general-owt-transfer',
          },
          {
            path: 'general-owt-transfer',
            component: GeneralOwtTransferComponent,
            resolve: {
              accounts: AccountsResolver,
              currencies: UserCurrenciesResolver,
              countries: CountriesResolver,
              tansRequired: OwtTanSettingsResolver,
              templates: OwtTemplateResolver
            },
            data: {
              currenciesFilters: CurrenciesFilter.Active,
              crumbs: 'Outgoing Wire Transfer',
            },
          },
        ]
      },
      {
        path: 'card-funding-transfer',
        component: CardFundingTransferComponent,
        canActivate: [AccountsCardsGuard],
        resolve: {
          accounts: AccountsResolver,
          cards: CardsForUserResolver,
          templates: CftTemplateResolver,
          tansRequired: CftTanSettingsResolver
        },
        data: {
          crumbs: 'Card Funding Transfer',
        }
      },
      {
        path: 'incoming-wire-transfer',
        component: UserIwtComponent,
        resolve: {
          accounts: AccountsWithIwtInstructionsAvailableResolver,
        },
        data: {
          crumbs: 'Incoming Wire Transfer',
        }
      },
      {
        path: 'buy-crypto-currency',
        component: UserBccComponent,
        resolve: {
          accounts: AccountsResolver,
          currencies: UserCurrenciesResolver,
        },
        data: {
          currenciesFilters: CurrenciesFilter.ActiveCrypto,
        },
      },
      {
        path: 'sell-crypto-currency',
        component: UserSccComponent,
        resolve: {
          accounts: AccountsResolver,
          currencies: UserCurrenciesResolver,
        },
        data: {
          currenciesFilters: CurrenciesFilter.ActiveCrypto,
        },
      },
    ]
  },
  {
    path: 'admin',
    canActivate: [AdminRoleGuard, UserPermissionGuard],
    data: {
      permissions: [UserPermissions.INITIATE_EXECUTE_USER_TRANSFER],
      redirectTo: '/transfer/no-permission'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'transfer-between-accounts'
      },
      {
        path: 'transfer-between-accounts',
        component: AdminTbaComponent,
        data: {
          crumbs: 'Transfer Between Accounts',
        },
      },
      {
        path: 'transfer-between-users',
        component: AdminTbuComponent,
        data: {
          crumbs: 'Transfer Between Users',
        },
      },
      {
        path: 'outgoing-wire-transfer',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'general-owt-transfer',
          },
          {
            path: 'general-owt-transfer',
            component: AdminGeneralOwtComponent,
            resolve: {
              currencies: UserCurrenciesResolver,
              countries: CountriesResolver,
            },
            data: {
              currenciesFilters: CurrenciesFilter.Active,
              crumbs: 'Outgoing Wire Transfer',
            },
          },
          // TODO page has been recognized as redundant for demo release
          // {
          //   path: 'sepa-transfers-section',
          //   component: SepaTransfersSectionComponent,
          // }
        ]
      },
      {
        path: 'buy-crypto-currency',
        component: AdminBccComponent,
        resolve: {
          currencies: UserCurrenciesResolver,
        },
        data: {
          currenciesFilters: CurrenciesFilter.ActiveCrypto,
        },
      },
      {
        path: 'sell-crypto-currency',
        component: AdminSccComponent,
        resolve: {
          currencies: UserCurrenciesResolver,
        },
        data: {
          currenciesFilters: CurrenciesFilter.ActiveCrypto,
        },
      },
    ]
  },
  {
    path: 'no-permission',
    component: NoPermissionComponent,
  },
];
