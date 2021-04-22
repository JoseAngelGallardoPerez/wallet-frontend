import { ImportCsvComponent } from '@app/modules/import-csv/components/import-csv/import-csv.component';
import { UserPermissions } from '@constants/userPermissions';
import { NoPermissionComponent } from '@layouts/error/no-permission/no-permission.component';
import { UserPermissionGuard } from '@guards/user-permission.guard';

export const DefaultImportCsvRouting = [
  {
    path: 'import-csv',
    children: [
      {
        path: 'transfer_requests',
        component: ImportCsvComponent,
        canActivate: [UserPermissionGuard],
        data: {
          permissions: [UserPermissions.IMPORT_TRANSFER_REQUEST_UPDATES],
          redirectTo: '/admin/import-csv/no-permission',
          crumbs: 'Import CSV'
        },
      },
      {
        path: 'accounts',
        component: ImportCsvComponent,
        canActivate: [UserPermissionGuard],
        data: {
          permissions: [UserPermissions.MANUAL_DEBIT_CREDIT_ACCOUNT],
          redirectTo: '/admin/import-csv/no-permission',
          crumbs: 'Import CSV'
        },
      },
      {
        path: 'no-permission',
        component: NoPermissionComponent,
      }
    ],
  },
];
