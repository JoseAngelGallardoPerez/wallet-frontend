import { CurrenciesFilter, CurrenciesResolver } from '@resolvers/currency/currencies.resolver';
import { UserPermissionGuard } from '@guards/user-permission.guard';
import { UserPermissions } from '@constants/userPermissions';
import { IwtBankDetailsListComponent } from '@app/modules/settings-account/components/iwt-bank-details/iwt-bank-details-list/iwt-bank-details-list.component';
import { AccountTypesListComponent } from '@app/modules/settings-account/components/account-types/account-types-list/account-types-list.component';
import { AccountsCardsGuard } from '@guards/accounts/cards.guard';
import { AccountComponent } from '@app/modules/settings-account/components/account.component';
import { ActiveCurrenciesComponent } from '@app/modules/settings-account/components/active-currencies/active-currencies.component';
import { ExchangeRatesComponent } from '@app/modules/settings-account/components/exchange-rates/exchange-rates.component';
import { IwtBankDetailsCreateComponent } from '@app/modules/settings-account/components/iwt-bank-details/iwt-bank-details-create/iwt-bank-details-create.component';
import { IwtBankDetailsEditComponent } from '@app/modules/settings-account/components/iwt-bank-details/iwt-bank-details-edit/iwt-bank-details-edit.component';
import { AddNewAccountTypeComponent } from '@app/modules/settings-account/components/account-types/add-new-account-type/add-new-account-type.component';
import { EditAccountTypeComponent } from '@app/modules/settings-account/components/account-types/edit-account-type/edit-account-type.component';
import { CardTypeEditComponent } from '@app/modules/settings-account/components/card-types/card-type-edit/card-type-edit.component';
import { CardTypesListComponent } from '@app/modules/settings-account/components/card-types/card-types-list/card-types-list.component';
import { IwtBankDetailsSingleResolver } from '@app/modules/settings-account/resolvers/iwt-bank-details-single.resolver';
import { PaymentMethodsResolver } from '@app/modules/settings-account/resolvers/payment-methods.resolver';
import { PaymentPeriodsResolver } from '@app/modules/settings-account/resolvers/payment-period.resolver';
import { CurrencySettingsResolver } from '@app/modules/settings-account/resolvers/currency-settings.resolver';
import { MainCurrencyExchangeRatesResolver } from '@app/modules/settings-account/resolvers/main-currency-exchange-rates.resolver';
import { MainCurrencyResolver } from '@app/modules/settings-account/resolvers/main-currency.resolver';
import { AccountTypeResolver } from '@app/modules/settings-account/resolvers/account-type.resolver';
import { CountriesResolver } from '@app/modules/shared/countries/resolvers/countries.resolver';
import { CardTypeResolver } from '@app/modules/settings-account/resolvers/card-type.resolver';
import { ViewAccountTypeComponent } from '@lib/modules/settings-account/components/account-types/view-account-type/view-account-type.component';
import { AccountTypeComponent } from '@lib/modules/settings-account/components/account-types/account-type/account-type.component';
import { CardTypeComponent } from '@lib/modules/settings-account/components/card-types/card-type/card-type.component';
import { ViewCardTypeComponent } from '@lib/modules/settings-account/components/card-types/view-card-type/view-card-type.component';
import { TableRatesMarginComponent } from '@lib/modules/settings-account/components/exchange-rates/table-rates-margin/table-rates-margin.component';
import { CURRENCY_TYPE } from '@constants/currencies';
import { AddCurrencyComponent } from '@lib/modules/settings-account/components/active-currencies/add-currency/add-currency.component';

export const DefaultSettingsAccountRouting = [

  {
    path: '',
    component: AccountComponent,
    data: {
      crumbs: 'Accounts Settings',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'active-currencies',
      },
      {
        path: 'active-currencies',
        children: [
          {
            path: '',
            component: ActiveCurrenciesComponent,
            data: {
              showTabs: true,
              showTopTabs: true
            },
            resolve: {
              currencies: CurrenciesResolver,
              currencySettings: CurrencySettingsResolver,
            }
          },
          // Custom currency
          {
            path: 'add',
            component: AddCurrencyComponent,
            data: {
              crumbs: 'Add New Currency',
            },
          },
        ]
      },
      {
        path: 'exchange-rates',
        component: ExchangeRatesComponent,
        data: {
          showTabs: true,
          showTopTabs: true
        },
        resolve: {
          currencySettings: CurrencySettingsResolver,
          exchangeRates: MainCurrencyExchangeRatesResolver,
          mainCurrency: MainCurrencyResolver
        },
        children: [
          {
            path: '',
            partMath: 'full',
            redirectTo: CURRENCY_TYPE.FIAT,
          },
          {
            path: CURRENCY_TYPE.FIAT,
            component: TableRatesMarginComponent,
            data: {
              showTabs: true,
              showTopTabs: true,
            },
          },
          {
            path: CURRENCY_TYPE.CRYPTO,
            component: TableRatesMarginComponent,
            data: {
              showTabs: true,
              showTopTabs: true,
            },
          },
          {
            path: CURRENCY_TYPE.OTHER,
            component: TableRatesMarginComponent,
            data: {
              showTabs: true,
              showTopTabs: true,
            },
          },
        ]
      },
      {
        path: 'account-types',
        children: [
          {
            path: '',
            component: AccountTypesListComponent,
            data: {
              showTabs: true,
              showTopTabs: true
            },
          },
          {
            path: 'create',
            component: AddNewAccountTypeComponent,
            resolve: {
              currencies: CurrenciesResolver,
              paymentMethods: PaymentMethodsResolver,
              paymentPeriods: PaymentPeriodsResolver
            },
            canActivate: [UserPermissionGuard],
            data: {
              crumbs: 'Create Account Type',
              permissions: [UserPermissions.MODIFY_ACCOUNT_TYPES],
              redirectTo: '/settings/no-permission',
              currenciesFilters: CurrenciesFilter.Active,
            },
          },
          {
            path: 'edit/:id',
            component: AccountTypeComponent,
            resolve: {
              accountType: AccountTypeResolver,
              currencies: CurrenciesResolver,
              paymentMethods: PaymentMethodsResolver,
              paymentPeriods: PaymentPeriodsResolver
            },
            data: {
              crumbs: 'Edit Account Type',
              currenciesFilters: CurrenciesFilter.Active,
            },
            children: [
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'view',
              },
              {
                path: 'view',
                component: ViewAccountTypeComponent,
              },
              {
                path: 'modify',
                canActivate: [UserPermissionGuard],
                data: {
                  permissions: [UserPermissions.MODIFY_ACCOUNT_TYPES],
                  redirectTo: '/settings/no-permission'
                },
                component: EditAccountTypeComponent,
              }

            ]
          },
        ]
      },
      {
        path: 'card-types',
        canActivate: [AccountsCardsGuard],
        children: [
          {
            path: '',
            component: CardTypesListComponent,
            data: {
              showTabs: true,
              showTopTabs: true
            },
          },
          {
            path: 'create',
            component: CardTypeEditComponent,
            resolve: {
              currencies: CurrenciesResolver
            },
            data: {
              currenciesFilters: CurrenciesFilter.Active,
            },
          },
          {
            path: ':id',
            component: CardTypeComponent,
            resolve: {
              cardType: CardTypeResolver,
              currencies: CurrenciesResolver
            },
            data: {
              currenciesFilters: CurrenciesFilter.Active,
            },
            children: [
              {
                path: '',
                partMath: 'full',
                redirectTo: 'view',
              },
              {
                path: 'view',
                component: ViewCardTypeComponent,
              },
              {
                path: 'modify',
                component: CardTypeEditComponent
              }
            ]
          },
        ]
      },
      {
        path: 'iwt-bank-details',
        children: [
          {
            path: '',
            component: IwtBankDetailsListComponent,
            data: {
              showTabs: true,
              showTopTabs: true
            },
          },
          {
            path: 'create',
            component: IwtBankDetailsCreateComponent,
            resolve: {
              currencies: CurrenciesResolver,
              countries: CountriesResolver,
            },
            canActivate: [UserPermissionGuard],
            data: {
              crumbs: 'Create IWT Bank Details',
              permissions: [UserPermissions.CREATE_MODIFY_IWT_BANK_ACCOUNTS],
              redirectTo: '/settings/no-permission',
              currenciesFilters: CurrenciesFilter.Active,
            },
          },
          {
            path: 'edit/:id',
            component: IwtBankDetailsEditComponent,
            resolve: {
              currencies: CurrenciesResolver,
              countries: CountriesResolver,
              iwtBankDetailsSingle: IwtBankDetailsSingleResolver,
            },
            canActivate: [UserPermissionGuard],
            data: {
              crumbs: 'Edit IWT Bank Details',
              permissions: [UserPermissions.CREATE_MODIFY_IWT_BANK_ACCOUNTS],
              redirectTo: '/settings/no-permission',
              currenciesFilters: CurrenciesFilter.Active,
            },
          }
        ]
      },
    ]

  }
];
