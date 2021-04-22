import { SystemConfigComponent } from '@app/modules/system-config/components/system-config.component';
import { GeneralComponent } from '@app/modules/system-config/components/general/general.component';
import { ModulesComponent } from '@app/modules/system-config/components/modules/modules.component';
import { LoginSecurityComponent } from '@app/modules/system-config/components/login-security/login-security.component';
import { SystemConfigModulesResolver } from '@app/modules/system-config/resolvers/modules.resolver';
import { SystemConfigGeneralResolver } from '@app/modules/system-config/resolvers/general.resolver';
import { SystemConfigLoginSecurityResolver } from '@app/modules/system-config/resolvers/loginSecurity.resolver';

export const DefaultSettingsSystemConfigRouting = [

  {
    path: '',
    component: SystemConfigComponent,
    data: {
      crumbs: 'System Config Settings',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'general',
      },
      {
        path: 'general',
        component: GeneralComponent,
        data: {
          showTopTabs: true
        },
        resolve: {
          options: SystemConfigGeneralResolver
        }
      },
      {
        path: 'modules',
        component: ModulesComponent,
        data: {
          showTopTabs: true
        },
        resolve: {
          options: SystemConfigModulesResolver
        }
      },
      {
        path: 'login-security',
        component: LoginSecurityComponent,
        data: {
          showTopTabs: true
        },
        resolve: {
          options: SystemConfigLoginSecurityResolver
        }
      },
    ]
  }
];
