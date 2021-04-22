// tslint:disable:max-line-length

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// RESOLVERS
// COMPONENTS:LAYOUT
// COMPONENTS:OTHER
import { AlreadyAuthenticatedGuard } from '@guards/alreadyAuthenticated.guard';
import { UserRoleGuard } from '@guards/user-role.guard';
import { MainLayoutComponent } from '@layouts/main-layout/main-layout.component';
import { AdminRoleGuard } from '@guards/admin-role.guard';
import { NotFoundComponent } from '@layouts/error/not-found/not-found.component';
import { SwaggerUrlResolver } from '@resolvers/swagger-url.resolver';
import { AccountsCardsGuard } from '@guards/accounts/cards.guard';
import { AuthGuard } from '@guards/auth.guard';
import { PRODUCTION } from '@constants/envNames';
import { environment } from '@environments/environment';
import { CheckMaintenanceGuard } from '@guards/maintenance-guards/check-maintenance.guard';
import { MaintenanceMessageComponent } from '@components/maintenance-message/maintenance-message.component';
import { MaintenanceDisableGuard } from '@guards/maintenance-guards/maintenance-disable.guard';

export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },

  {
    path: 'unavailable-message',
    canActivate: [MaintenanceDisableGuard],
    component: MaintenanceMessageComponent,
  },

  // Auth
  {
    path: '',
    canActivate: [AlreadyAuthenticatedGuard],
    loadChildren: () => import('@default-routers/auth/default-auth.module').then(m => m.DefaultAuthModule),
  },

  // Application

  // until resolve about invoices in this project
  // {
  //   path: 'success',
  //   canActivate: [CheckMaintenanceGuard, AuthGuard],
  //   loadChildren: '@default-routers/invoices/default-success-invoices.module#DefaultSuccessInvoicesModule',
  // },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [CheckMaintenanceGuard, AuthGuard],
    children: [
      // until resolve about invoices in this project
      // {
      //   path: 'invoices',
      //   loadChildren: '@default-routers/invoices/default-invoices.module#DefaultInvoicesModule',
      // },

      // Admin
      {
        path: 'admin',
        canActivate: [AdminRoleGuard],
        data: {
          crumbs: null,
        },
        children: [

          // Import-CSV
          {
            path: '',
            loadChildren: () => import('@default-routers/import-csv/default-import-csv.module').then(m => m.DefaultImportCsvModule),
          },

          // Requests

          {
            path: 'requests',
            loadChildren: () => import('@default-routers/admin-requests/default-admin-requests.module').then(m => m.DefaultAdminRequestsModule),
          },

          // Accounts

          {
            path: 'accounts',
            loadChildren: () => import('@default-routers/admin-accounts/default-admin-accounts.module').then(m => m.DefaultAdminAccountsModule),
          },

          // Profiles
          {
            path: 'profiles',
            loadChildren: () => import('@default-routers/profiles/default-profile.module').then(m => m.DefaultProfileModule),
          },

          // Admin news

          {
            path: 'news',
            canActivate: [AdminRoleGuard],
            loadChildren: () => import('@default-routers/admin-news/default-admin-news.module').then(m => m.DefaultAdminNewsModule),
          },

          // System log

          {
            path: 'system-log',
            loadChildren: () => import('@default-routers/system-log/default-system-log.module').then(m => m.DefaultSystemLogModule),
          },

        ]
      },

      // Messages

      {
        path: 'messages',
        data: {
          crumbs: 'Messages',
        },
        loadChildren: () => import('@default-routers/messages/default-messages.module').then(m => m.DefaultMessagesModule)
      },

      // TRANSFER

      {
        path: 'transfer',
        loadChildren: () => import('@default-routers/transfer/default-transfer.module').then(m => m.DefaultTransferModule),
      },

      {
        path: 'my-accounts',
        canActivate: [UserRoleGuard],
        loadChildren: () => import('@default-routers/user-account/default-user-account.module').then(m => m.DefaultUserAccountModule),
      },
      {
        path: 'profiles',
        loadChildren: () => import('@default-routers/profiles/default-profile.module').then(m => m.DefaultProfileModule),
      },
      {
        path: 'my-cards',
        canActivate: [UserRoleGuard, AccountsCardsGuard],
        loadChildren: () => import('@default-routers/user-cards/default-user-cards.module').then(m => m.DefaultUserCardsModule),
      },
      {
        path: 'my-profile',
        loadChildren: () => import('@default-routers/my-profile/default-my-profile.module').then(m => m.DefaultMyProfileModule),
      },

      {
        path: 'user-news',
        canActivate: [UserRoleGuard],
        loadChildren: () => import('@default-routers/user-news/default-user-news.module').then(m => m.DefaultUserNewsModule),
      },
      {
        path: 'user-reports',
        canActivate: [UserRoleGuard],
        loadChildren: () => import('@default-routers/user-reports/default-user-reports.module').then(m => m.DefaultUserReportsModule),
      },

      {
        path: 'reports',
        canActivate: [AdminRoleGuard],
        loadChildren: () => import('@default-routers/admin-reports/default-admin-reports.module').then(m => m.DefaultAdminReportsModule),
      },

      // Settings

      {
        path: 'settings',
        canActivate: [AdminRoleGuard],
        loadChildren: () => import('@default-routers/settings-main/default-settings-main.module').then(m => m.DefaultSettingsMainModule)
      },

      // OTHER
      {
        path: 'not-found',
        component: NotFoundComponent,
      },
    ]
  },
];

if (environment.envName !== PRODUCTION) {
  routes.push(
    {
      path: 'swagger',
      pathMatch: 'prefix',
      resolve: {
        url: SwaggerUrlResolver,
      },
      component: NotFoundComponent,
      children: [
        {
          path: '**',
          resolve: {
            url: SwaggerUrlResolver,
          },
          component: NotFoundComponent,
        }
      ]
    },
  );
}

routes.push(
  {
    path: '**',
    redirectTo: 'not-found'
  }
);

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class DefaultAppRoutingModule {
}
