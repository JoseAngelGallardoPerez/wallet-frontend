import { InformationLogComponent } from '@app/modules/system-log/components/information-log/information-log.component';
import { TransactionLogComponent } from '@app/modules/system-log/components/transaction-log/transaction-log.component';
import { SystemLogComponent } from '@app/modules/system-log/components/system-log.component';
import { LogViewComponent } from '@app/modules/system-log/components/log-view/log-view.component';
import { LogViewResolver } from '@app/modules/system-log/resolvers/logView.resolver';
import { ScheduledTransactionsLogComponent } from '@lib/modules/system-log/components/scheduled-transactions-log/scheduled-transactions-log.component';
import { ScheduledTransactionLogResolver } from '@lib/modules/system-log/resolvers/scheduled-transaction-log.resolver';
import { UserPermissionGuard } from '@guards/user-permission.guard';
import { UserPermissions } from '@constants/userPermissions';
import { NoPermissionComponent } from '@layouts/error/no-permission/no-permission.component';
import { NoPermissionGuard } from '@guards/no-permission-guard.service';

export const DefaultSystemLogRouting = [

  {
    path: '',
    component: SystemLogComponent,
    canActivate: [UserPermissionGuard],
    data: {
      permissions: [UserPermissions.VIEW_SYSTEM_LOG],
      redirectTo: '/admin/system-log/no-permission',
      crumbs: 'System Logs',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'transaction-log',
      },
      {
        path: 'transaction-log',
        component: TransactionLogComponent,
      },
      {
        path: 'information-log',
        component: InformationLogComponent,
      },
      {
        path: 'scheduled-transaction-log',
        component: ScheduledTransactionsLogComponent,
      },
      {
        path: 'log-view/:id',
        component: LogViewComponent,
        resolve: {
          logDescription: LogViewResolver
        }
      },
      {
        path: 'scheduled-transaction-log-view/:id',
        component: LogViewComponent,
        resolve: {
          logDescription: ScheduledTransactionLogResolver
        }
      },
    ]
  },
  {
    path: 'no-permission',
    component: NoPermissionComponent,
    canActivate: [NoPermissionGuard],
  },
];
