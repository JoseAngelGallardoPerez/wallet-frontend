import { RequestsTanComponent } from '@app/modules/settings-tan/components/requests-tan.component';
import { RequestComponent } from '@app/modules/settings-tan/components/request/request.component';
import { TanMessageComponent } from '@app/modules/settings-tan/components/tan-message/tan-message.component';
import { TanSmsComponent } from '@app/modules/settings-tan/components/tan-sms/tan-sms.component';
import { SettingsTanResolver } from '@app/modules/settings-tan/resolvers/settings-tan.resolver';
import { PushNotificationsResolver } from '@app/modules/shared/push-notification/resolvers/push-notifications.resolver';
import { ExtensionSmsTanActivityResolver } from '@extensions/modules/tan-by-sms-module/resolvers/extension-sms-tan-activity.resolver';
import { ExtensionSmsTanActivityGuard } from '@extensions/modules/tan-by-sms-module/guards/extension-sms-tan-activity.guard';

export const DefaultSettingsTanRouting = [
  {
    path: '',
    component: RequestsTanComponent,
    resolve: {
      extensionsTanActivity: ExtensionSmsTanActivityResolver
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'request',
      },
      {
        path: 'request',
        component: RequestComponent,
        data: {
          showTopTabs: true
        },
        resolve: {
          tanResolve: SettingsTanResolver
        }
      },
      {
        path: 'tan-sms',
        component: TanSmsComponent,
        data: {
          showTopTabs: true
        },
        canActivate: [ExtensionSmsTanActivityGuard],
        resolve: {
          tanSmsResolve: PushNotificationsResolver,
        }
      },
      {
        path: 'message',
        component: TanMessageComponent,
        data: {
          showTopTabs: true
        },
        resolve: {
          tanMessageResolve: SettingsTanResolver
        }
      }
    ]
  }
];
