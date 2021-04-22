import { SuccessImportComponent } from '@lib/modules/invoices/success-import/success-import.component';
import { MainContainerComponent } from '@lib/modules/shared-components/main-container/main-container.component';

export const DefaultInvoicesSuccessRouting = [
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'invoices',
      },
      {
        path: 'invoices',
        children: [
          {
            path: ':data',
            component: SuccessImportComponent,
          },
        ]
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
