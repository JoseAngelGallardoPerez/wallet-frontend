import { SettingsSystemSmsComponent } from '@lib/modules/system-sms/components/settings-system-sms/settings-system-sms.component';
import { NotificationsSettingsResolver } from "@lib/modules/system-sms/resolvers/notificationsSettings.resolver";

export const DefaultSettingsSystemSmsRouting = [
  {
    path: '',
    data: {
      crumbs: 'System SMS Settings',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'common-settings',
      },
      {
        path: 'common-settings',
        component: SettingsSystemSmsComponent,
        data: {
          showTopTabs: true
        },
        resolve: {
          settings: NotificationsSettingsResolver
        }
      },
    ]
  }
];
