import { SystemEmailComponent } from '@app/modules/system-email/components/system-email.component';
import { CommonSettingsComponent } from '@app/modules/system-email/components/common-settings/common-settings.component';
import { TemplateNotificationsComponent } from '@app/modules/system-email/components/template-notifications/template-notifications.component';
import { NotificationTokensComponent } from '@app/modules/system-email/components/notification-tokens/notification-tokens.component';
import { NotificationTokenResolver } from '@app/modules/system-email/resolvers/notificationToken.resolver';
import { AdminNotificationsResolver } from '@app/modules/system-email/resolvers/adminNotifications.resolver';
import { UserNotificationsResolver } from '@app/modules/system-email/resolvers/userNotifications.resolver';
import { CommonSettingsResolver } from '@app/modules/system-email/resolvers/commonSettings.resolver';

export const DefaultSettingsSystemEmailRouting = [

  {
    path: '',
    component: SystemEmailComponent,
    data: {
      crumbs: 'System Emails Settings',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'common-settings',
      },
      {
        path: 'common-settings',
        component: CommonSettingsComponent,
        data: {
          showTopTabs: true
        },
        resolve: {
          settings: CommonSettingsResolver
        }
      },
      {
        path: 'end-user-notifications',
        component: TemplateNotificationsComponent,
        data: {
          showTopTabs: true
        },
        resolve: {
          settings: UserNotificationsResolver
        }
      },
      {
        path: 'administrator-notifications',
        component: TemplateNotificationsComponent,
        data: {
          showTopTabs: true
        },
        resolve: {
          settings: AdminNotificationsResolver
        }
      },
      {
        path: 'notification-tokens',
        component: NotificationTokensComponent,
        data: {
          showTopTabs: true
        },
        resolve: {
          tokens: NotificationTokenResolver
        }
      }
    ]
  }
];
