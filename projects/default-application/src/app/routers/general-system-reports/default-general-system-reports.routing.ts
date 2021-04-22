import { BalancesComponent } from '@app/modules/admin-reports/general-system-reports/components/balances/balances.component';
import { AllCardsComponent } from '@app/modules/admin-reports/general-system-reports/components/all-cards/all-cards.component';
import { RevenueComponent } from '@app/modules/admin-reports/general-system-reports/components/revenue/revenue.component';
import { GeneralSystemReportsComponent } from '@app/modules/admin-reports/general-system-reports/components/general-system-reports.component';
import { MaturityDatesComponent } from '@app/modules/admin-reports/general-system-reports/components/maturity-dates/maturity-dates.component';
import { AllTransactionsComponent } from '@app/modules/admin-reports/general-system-reports/components/all-transactions/all-transactions.component';
import { InterestsComponent } from '@app/modules/admin-reports/general-system-reports/components/interests/interests.component';
import { AccessLogComponent } from '@app/modules/admin-reports/general-system-reports/components/access-log/access-log.component';
import { SystemOverviewComponent } from '@app/modules/admin-reports/general-system-reports/components/system-overview/system-overview.component';
import { OutgoingWireTransfersComponent } from '@app/modules/admin-reports/general-system-reports/components/outgoing-wire-transfers/outgoing-wire-transfers.component';
import { ManualTransactionsComponent } from '@app/modules/admin-reports/general-system-reports/components/manual-transactions/manual-transactions.component';
import { AdminTransactionReportsResolver } from '@app/modules/admin-reports/general-system-reports/resolvers/adminTransactionReports.resolver';
import { AdminBalanceReportsResolver } from '@app/modules/admin-reports/general-system-reports/resolvers/adminBalanceReports.resolver';
import { MaturityDatesResolver } from '@app/modules/admin-reports/general-system-reports/resolvers/maturityDates.resolver';
import { CurrenciesFilter } from '@resolvers/currency/currencies.resolver';
import { CardReportsResolver } from '@app/modules/admin-reports/general-system-reports/resolvers/cardReports.resolver';
import { AccessLogReportsResolver } from '@app/modules/admin-reports/general-system-reports/resolvers/accessLogReports.resolver';
import { ManualTransactionReportsResolver } from '@app/modules/admin-reports/general-system-reports/resolvers/manualTransactionReports.resolver';
import { InterestReportsResolver } from '@app/modules/admin-reports/general-system-reports/resolvers/interestReports.resolver';
import { OverviewReportResolver } from '@app/modules/admin-reports/general-system-reports/resolvers/overviewReportResolver';
import { AccountsCardsGuard } from '@guards/accounts/cards.guard';
import { UserCurrenciesResolver } from '@app/modules/shared/currency/resolvers/user-currencies.resolver';
import { NoPermissionComponent } from '@layouts/error/no-permission/no-permission.component';
import { UserPermissionGuard } from '@guards/user-permission.guard';
import { UserPermissions } from '@constants/userPermissions';

export const DefaultGeneralSystemReportsRouting = [
  {
    path: '',
    component: GeneralSystemReportsComponent,
    canActivate: [UserPermissionGuard],
    data: {
      permissions: [UserPermissions.VIEW_GENERAL_SYSTEM_REPORTS],
      redirectTo: '/reports/general-system-reports/no-permission',
      crumbs: 'General System Reports',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all-transactions',
      },
      {
        path: 'all-transactions',
        component: AllTransactionsComponent,
        resolve: {
          reports: AdminTransactionReportsResolver
        }
      },
      {
        path: 'balances',
        component: BalancesComponent,
        resolve: {
          reports: AdminBalanceReportsResolver
        }
      },
      {
        path: 'maturity-dates',
        component: MaturityDatesComponent,
        resolve: {
          maturityDates: MaturityDatesResolver
        }
      },
      {
        path: 'outgoing-wire-transfer',
        component: OutgoingWireTransfersComponent,
        resolve: {
          currencies: UserCurrenciesResolver,
        },
        data: {
          currenciesFilters: CurrenciesFilter.Active,
        },
      },
      {
        path: 'all-cards',
        component: AllCardsComponent,
        canActivate: [AccountsCardsGuard],
        resolve: {
          reports: CardReportsResolver
        }
      },
      {
        path: 'manual-transactions',
        component: ManualTransactionsComponent,
        resolve: {
          reports: ManualTransactionReportsResolver
        }
      },
      {
        path: 'interests',
        component: InterestsComponent,
        resolve: {
          reports: InterestReportsResolver
        }
      },
      {
        path: 'revenue',
        component: RevenueComponent,
        resolve: {
          currencies: UserCurrenciesResolver,
        },
        data: {
          currenciesFilters: CurrenciesFilter.Active,
        },
      },
      {
        path: 'access-log',
        component: AccessLogComponent,
        resolve: {
          reports: AccessLogReportsResolver
        }
      },
      {
        path: 'system-overview',
        component: SystemOverviewComponent,
        resolve: {
          reports: OverviewReportResolver
        }
      }
    ]
  },
  {
    path: 'no-permission',
    component: NoPermissionComponent,
  },
];
