import { SpecificAccountReportComponent } from '@app/modules/admin-reports/specific-user-reports/components/specific-account-report/specific-account-report.component';
import { BalancesReportComponent } from '@app/modules/admin-reports/specific-user-reports/components/balances-report/balances-report.component';
import { SpecificUserReportsComponent } from '@app/modules/admin-reports/specific-user-reports/components/specific-user-reports.component';
import { AllTransactionsReportComponent } from '@app/modules/admin-reports/specific-user-reports/components/all-transactions-report/all-transactions-report.component';
import { NoPermissionComponent } from '@layouts/error/no-permission/no-permission.component';
import { UserPermissionGuard } from '@guards/user-permission.guard';
import { UserPermissions } from '@constants/userPermissions';

export const DefaultSpecificUserReportsRouting = [

  {
    path: '',
    component: SpecificUserReportsComponent,
    canActivate: [UserPermissionGuard],
    data: {
      permissions: [UserPermissions.VIEW_USER_REPORTS],
      redirectTo: '/reports/specific-user-reports/no-permission',
      crumbs: 'Specific User Reports',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'specific-account-report',
      },
      {
        path: 'specific-account-report',
        component: SpecificAccountReportComponent,
      },
      {
        path: 'all-transactions-report',
        component: AllTransactionsReportComponent,
      },
      {
        path: 'balances-report',
        component: BalancesReportComponent,
      }
    ]
  },
  {
    path: 'no-permission',
    component: NoPermissionComponent,
  },
];

