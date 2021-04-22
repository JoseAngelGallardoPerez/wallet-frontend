import { PushNotificationsComponent } from '@app/modules/settings-main/components/push-notifications/push-notifications.component';
import { SettingsComponent } from '@app/modules/settings-main/components/settings.component';
import { PushNotificationsResolver } from '@app/modules/shared/push-notification/resolvers/push-notifications.resolver';
import { SettingsElinqComponent } from '@app/modules/verification/components/settings-elinq/settings-elinq.component';
import { ElinqSettingsResolver } from '@app/modules/verification/resolvers/elinq-setting.resolver';
import { VerificationGuard } from '@app/modules/verification/guards/verification.guard';
import { RootRoleGuard } from '@guards/root-role.guard';
import { NoPermissionComponent } from '@layouts/error/no-permission/no-permission.component';
import { UserPermissions } from '@constants/userPermissions';
import { UserPermissionGuard } from '@guards/user-permission.guard';

export const DefaultSettingsMainRouting = [

  {
    path: '',
    component: SettingsComponent,
    canActivate: [UserPermissionGuard],
    data: {
      permissions: [UserPermissions.VIEW_SETTINGS],
      redirectTo: '/settings/no-permission'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile',
      },
      {
        path: 'account',
        loadChildren: () => import('@default-routers/settings-account/default-settings-account.module').then(m => m.DefaultSettingsAccountModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('@default-routers/settings-profile/default-settings-profile.module').then(m => m.DefaultSettingsProfileModule),
      },
      {
        path: 'fee',
        loadChildren: () => import('@default-routers/settings-fee/default-settings-fee.module').then(m => m.DefaultSettingsFeeModule),
      },
      {
        path: 'customization',
        loadChildren: () => import('@default-routers/settings-customization/default-settings-customization.module').then(m => m.DefaultSettingsCustomizationModule),
      },
      {
        path: 'requests-tan',
        loadChildren: () => import('@default-routers/settings-tan/default-settings-tan.module').then(m => m.DefaultSettingsTanModule),
      },
      {
        path: 'system-email',
        loadChildren: () => import('@default-routers/settings-system-email/default-settings-system-email.module').then(m => m.DefaultSettingsSystemEmailModule),
      },
      {
        path: 'system-sms',
        loadChildren: () => import('@default-routers/settings-system-sms/default-settings-system-sms.module').then(m => m.DefaultSettingsSystemSmsModule),
      },
      {
        path: 'system-config',
        loadChildren: () => import('@default-routers/settings-system-config/default-settings-system-config.module').then(m => m.DefaultSettingsSystemConfigModule),
      },
      {
        path: 'root',
        canActivate: [RootRoleGuard],
        loadChildren: () => import('@default-routers/settings-extensions/default-settings-extensions.module').then(m => m.DefaultSettingsExtensionsModule),
      },
      {
        path: 'push-notifications',
        component: PushNotificationsComponent,
        data: {
          showTopTabs: true
        },
        resolve: {
          pushNotificationsResolve: PushNotificationsResolver
        }
      },
      {
        path: 'elinq',
        canActivate: [VerificationGuard],
        component: SettingsElinqComponent,
        data: {
          showTopTabs: true
        },
        resolve: {
          elinqSettingsResolve: ElinqSettingsResolver
        }
      }
    ]
  },
  {
    path: 'no-permission',
    component: NoPermissionComponent,
  },
];
