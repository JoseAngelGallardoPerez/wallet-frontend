import { NoPermissionComponent } from '@layouts/error/no-permission/no-permission.component';
import { InvoicesComponent } from '@lib/modules/invoices/invoices.component';
import { ListInvoicesComponent } from '@lib/modules/invoices/list-invoices/list-invoices.component';
import { ImportInvoicesComponent } from '@lib/modules/invoices/import-invoices/import-invoices.component';
import { CreateInvoiceComponent } from '@lib/modules/invoices/create-invoice/create-invoice.component';
import { DatepickerBaseOptionsResolver } from '@resolvers/datepickerBaseOptions.resolver';
import { UserCurrenciesResolver } from '@shared-modules/currency/resolvers/user-currencies.resolver';
import { InvoiceDetailsComponent } from '@lib/modules/invoices/details/details.component';
import { SummaryInvoiceComponent } from '@lib/modules/invoices/details/summary-invoice/summary-invoice.component';
import { InvoiceResolver } from '@lib/modules/invoices/resolvers/invoice.resolver';
import { EditInvoiceComponent } from '@lib/modules/invoices/details/edit-invoice/edit-invoice.component';
import { MyProfileResolver } from '@lib/modules/my-profile/resolvers/myProfileResolver';

export const DefaultInvoicesBuyerRouting = [
  {
    path: '',
    component: InvoicesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'invoices',
      },
      {
        path: '',
        children: [
          {
            path: 'invoices',
            component: ListInvoicesComponent,
            data: {
              showTabs: true,
              crumbs: 'Manage Invoices'
            },
          },
          {
            path: 'upload',
            component: ImportInvoicesComponent,
            data: {
              showTabs: false,
              crumbs: 'Import Invoices'
            },
          },
          {
            path: 'create',
            component: CreateInvoiceComponent,
            data: {
              showTabs: false,
              crumbs: 'Create Invoices'
            },
            resolve: {
              currencies: UserCurrenciesResolver,
              datepickerOptions: DatepickerBaseOptionsResolver
            },
          },
          {
            path: ':id',
            component: InvoiceDetailsComponent,
            data: {
              crumbs: 'Invoice Details',
            },
            resolve: {
              invoice: InvoiceResolver,
            },
            children: [
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'summary',
              },
              {
                path: 'summary',
                component: SummaryInvoiceComponent,
                resolve: {
                  profile: MyProfileResolver,
                },
              },
              {
                path: 'edit',
                component: EditInvoiceComponent,
                resolve: {
                  currencies: UserCurrenciesResolver,
                  datepickerOptions: DatepickerBaseOptionsResolver
                }
              },
            ]
          },
        ]
      },
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
