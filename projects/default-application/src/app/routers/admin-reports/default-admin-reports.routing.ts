import { ReportsComponent } from '@app/modules/admin-reports/components/reports.component';

export const DefaultAdminReportsRouting = [

  {
    path: '',
    component: ReportsComponent,
    data: {
      crumbs: 'Reports',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'specific-user-reports',
      },
      {
        path: 'specific-user-reports',
        loadChildren: () => import('@default-routers/specific-user-reports/default-specific-user-reports.module').then(m => m.DefaultSpecificUserReportsModule),
      },
      {
        path: 'general-system-reports',
        loadChildren: () => import('@default-routers/general-system-reports/default-general-system-reports.module').then(m => m.DefaultGeneralSystemReportsModule),
      }
    ]
  },
];
