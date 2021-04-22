import { Route } from '@angular/router';
import { RootTabsComponent } from '@extensions/modules/settings-extensions-page-module/components/root-tabs/root-tabs.component';
import { RootConfigComponent } from '@lib/modules/system-config/components/root/root-config.component';
import { SettingsGeneralResolver } from '@lib/modules/system-config/resolvers/settings-general.resolver';

export const DefaultSettingsExtensionsRouting: Route[] = [
  {
    path: '',
    component: RootTabsComponent,
    data: {
      crumbs: 'Root Settings',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'config',
      },
      {
        path: 'config',
        component: RootConfigComponent,
        data: {
          showTopTabs: true,
        },
        resolve: {
          options: SettingsGeneralResolver
        }
      },

    ]
  }
];
