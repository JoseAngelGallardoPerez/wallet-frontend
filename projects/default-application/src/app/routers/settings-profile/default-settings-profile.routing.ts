import { ProfileComponent } from '@app/modules/settings-profile/components/profile.component';
import { UserGroupsComponent } from '@app/modules/settings-profile/components/user-groups/user-groups.component';
import { GroupEditComponent } from '@app/modules/settings-profile/components/user-groups/group-edit/group-edit.component';
import { UserOptionsComponent } from '@app/modules/settings-profile/components/user-options/user-options.component';
import { ClassesComponent } from '@lib/modules/settings-profile/components/classes/classes.component';
import { ClassEditComponent } from '@app/modules/settings-profile/components/classes/class-edit/class-edit.component';
import { AutoLogoutComponent } from '@app/modules/settings-profile/components/auto-logout/auto-logout.component';
import { SettingsPermissionGroupEditResolver } from '@app/modules/settings-profile/resolvers/settings-permission-group-edit.resolver';
import { AutoLogoutResolver } from '@app/modules/settings-profile/resolvers/autoLogout.resolver';
import { SettingsUserGroupsResolver } from '@app/modules/settings-profile/resolvers/settings-user-groups.resolver';
import { SettingsUserGroupEditResolver } from '@app/modules/settings-profile/resolvers/settings-user-group-edit.resolver';
import { UserOptionsResolver } from '@app/modules/settings-profile/resolvers/userOptions.resolver';
import { PermissionGroupsResolver } from '@app/modules/shared/permissionGroups/resolvers/permission-groups.resolver';
import { PermissionsCategoryResolver } from '@lib/modules/settings-profile/resolvers/permissions-category.resolver';
import { permissionsScope } from '@constants/permissions-scope.enum';
import { KycSettingsComponent } from '@lib/modules/settings-profile/components/kyc-settings/kyc-settings.component';
import { KycTierEditComponent } from '@lib/modules/settings-profile/components/kyc-settings/kyc-tier-edit/kyc-tier-edit.component';
import { TierByIdResolver } from '@lib/modules/settings-profile/resolvers/tier-by-id-resolver.service';
import { KycCountriesResolver } from '@lib/modules/settings-profile/resolvers/kyc-countries.resolver';
import { KycCountriesSettingsComponent } from '@lib/modules/settings-profile/components/kyc-settings/kyc-country-settings/kyc-countries-settings.component';

export const DefaultSettingsProfileRouting = [

  {
    path: '',
    component: ProfileComponent,
    data: {
      crumbs: 'Profiles Settings',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'administrator-classes',
      },
      {
        path: 'administrator-classes',
        component: ClassesComponent,
        data: {
          showTabs: true,
          showTopTabs: true,
          permissionsScope: permissionsScope.admin,
        },
        resolve: {
          permissionGroups: PermissionGroupsResolver
        },
      },
      {
        path: 'classes/new',
        component: ClassEditComponent,
        resolve: {
          categories: PermissionsCategoryResolver,
        },
        data: { crumbs: 'Create Administrator Class' }
      },
      {
        path: 'classes/:id',
        component: ClassEditComponent,
        resolve: {
          permissionGroup: SettingsPermissionGroupEditResolver,
          categories: PermissionsCategoryResolver,
        },
        data: { crumbs: 'Edit Administrator Class' },
      },
      // TODO hide for now
      // {
      //   path: 'user-classes',
      //   component: ClassesComponent,
      //   data: {
      //     showTabs: true,
      //     showTopTabs: true,
      //     permissionsScope: permissionsScope.client,
      //   },
      //   resolve: {
      //     permissionGroups: PermissionGroupsResolver
      //   },
      // },
      // {
      //   path: 'user-classes/new',
      //   component: ClassEditComponent,
      //   resolve: {
      //     categories: PermissionsCategoryResolver,
      //   },
      //   data: { crumbs: 'Create User Class' },
      // },
      // {
      //   path: 'user-classes/:id',
      //   component: ClassEditComponent,
      //   resolve: {
      //     permissionGroup: SettingsPermissionGroupEditResolver,
      //     categories: PermissionsCategoryResolver,
      //   },
      //   data: { crumbs: 'Edit User Class' },
      // },
      {
        path: 'auto-logout',
        component: AutoLogoutComponent,
        data: {
          showTabs: true,
          showTopTabs: true
        },
        resolve: {
          options: AutoLogoutResolver
        }
      },
      {
        path: 'user-groups',
        children: [
          {
            path: '',
            component: UserGroupsComponent,
            data: {
              showTabs: true,
              showTopTabs: true,
            },
            resolve: {
              userGroups: SettingsUserGroupsResolver
            },
          },
          {
            path: 'new',
            component: GroupEditComponent,
            data: { crumbs: 'Create User Group' }
          },
          {
            path: ':id',
            component: GroupEditComponent,
            resolve: {
              userGroup: SettingsUserGroupEditResolver
            },
            data: { crumbs: 'Edit User Group' }
          },
        ]
      },

      {
        path: 'kyc',
        children: [
          {
            path: '',
            component: KycSettingsComponent,
            data: {
              showTabs: true,
              showTopTabs: true,
            },
            resolve: {
              countries: KycCountriesResolver,
            },
            children: [
              {
                path: ':id',
                component: KycCountriesSettingsComponent,
                data: {
                  showTabs: true,
                  showTopTabs: true,
                },
              },
            ]
          },
          {
            path: 'edit/:id',
            component: KycTierEditComponent,
            data: {
              crumbs: 'Edit Tier'
            },
            resolve: {
              tierSettings: TierByIdResolver,
            },
          },
        ],
      },

      {
        path: 'user-options',
        component: UserOptionsComponent,
        data: {
          showTabs: true,
          showTopTabs: true
        },
        resolve: {
          options: UserOptionsResolver
        }
      }
    ]
  }

];
