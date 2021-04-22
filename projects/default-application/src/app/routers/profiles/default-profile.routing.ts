import { UserPermissionGuard } from '@guards/user-permission.guard';
import { UserPermissions } from '@constants/userPermissions';
import { DetailsComponent } from '@app/modules/profiles/components/user-profiles/details/details.component';
import { UserSettingsComponent } from '@app/modules/shared/profile-form/components/user-settings/user-settings.component';
import { UserFilesComponent } from '@app/modules/profiles/components/user-profiles/details/user-files/user-files.component';
import { AdministratorProfilesComponent } from '@app/modules/profiles/components/administrator-profiles/administrator-profiles.component';
import { NewAdministratorProfileComponent } from '@app/modules/profiles/components/administrator-profiles/new-administrator-profile/new-administrator-profile.component';
import { BlockingComponent } from '@app/modules/profiles/components/blocking/blocking.component';
import { NewUserProfileComponent } from '@app/modules/profiles/components/user-profiles/new-user-profile/new-user-profile.component';
import { UserProfilesComponent } from '@app/modules/profiles/components/user-profiles/user-profiles.component';
import { AdministratorDetailsComponent } from '@app/modules/profiles/components/administrator-profiles/administrator-details/administrator-details.component';
import { BlockedUserProfilesComponent } from '@app/modules/profiles/components/blocking/user-profiles/blocked-user-profiles.component';
import { IpAddressesComponent } from '@app/modules/profiles/components/blocking/ip-addresses/ip-addresses.component';
import { UserProfileResolver } from '@app/modules/profiles/resolvers/user-profile.resolver';
import { UserProfileFilesResolver } from '@app/modules/profiles/resolvers/user-profile-files.resolver';
import { UserProfileSettingsResolver } from '@app/modules/profiles/resolvers/user-profile-settings.resolver';
import { PermissionGroupsResolver } from '@app/modules/shared/permissionGroups/resolvers/permission-groups.resolver';
import { BlockedProfilesResolver } from '@app/modules/profiles/resolvers/blocked-profiles.resolver';
import { BlockedIpAddressesResolver } from '@app/modules/profiles/resolvers/blocked-ip-addresses.resolver';
import { UserSummaryComponent } from '@app/modules/shared/profile-form/components/user-summary/user-summary.component';
import { SecurityQuestionResolver } from '@app/modules/shared/profile-form/resolvers/security-question.resolver';
import { SettingsProfileSecurityQuestionResolver } from '@app/modules/profiles/resolvers/settings-profile-security-question.resolver';
import { AdminProfileSettingsComponent } from '@shared-modules/profile-form/components/admin-profile-settings/admin-profile-settings.component';
import { UserFileSizeLimitResolver } from '@lib/modules/profiles/resolvers/user-file-size-limit.resolver';
import { NoPermissionComponent } from '@layouts/error/no-permission/no-permission.component';
import { permissionsScope } from '@constants/permissions-scope.enum';
import { ProfileKycComponent } from '@lib/modules/profiles/components/user-profiles/profile-kyc/profile-kyc.component';
import { ProfileKycResolver } from '@shared-modules/profile-form/resolvers/profile-kyc.resolver';
import { ChangePasswordComponent } from '@lib/modules/profiles/components/user-profiles/change-password/change-password.component';

export const DefaultProfileRouting = [
  {
    path: '',
    data: {
      crumbs: 'Manage users',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user-profiles/:id',
      },
      {
        path: 'user-profiles/:id',
        children: [
          {
            path: '',
            component: UserProfilesComponent,
            data: {
              showTabs: true,
              permissions: [
                UserPermissions.VIEW_USER_PROFILES,
              ],
              redirectTo: '/admin/profiles/user-profiles/no-permission',
            },
          },
          {
            path: 'no-permission',
            component: NoPermissionComponent,
            data: {
              showTabs: true,
            },
          },
          {
            path: 'new-profile',
            component: NewUserProfileComponent,
            data: {
              permissions: [UserPermissions.CREATE_USER_PROFILE],
              permissionsScope: permissionsScope.client,
              redirectTo: '/admin/profiles/no-permission',
              crumbs: 'New user',
            },
            resolve: {
              permissionGroups: PermissionGroupsResolver,
            },
          },
          {
            path: ':id',
            component: DetailsComponent,
            canActivate: [UserPermissionGuard],
            data: {
              crumbs: 'User Details',
              permissionsScope: permissionsScope.client,
              permissions: [UserPermissions.VIEW_USER_PROFILES],
              redirectTo: '/admin/profiles/no-permission',
            },
            resolve: {
              profile: UserProfileResolver,
              permissionGroups: PermissionGroupsResolver,
            },
            children: [
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'summary',
              },
              {
                path: 'summary',
                component: UserSummaryComponent,
                resolve: {
                  profile: UserProfileResolver
                },
              },
              {
                path: 'profile',
                component: NewUserProfileComponent,
                canActivate: [UserPermissionGuard],
                data: {
                  permissions: [UserPermissions.MODIFY_USER_PROFILE],
                  redirectTo: '/admin/profiles/no-permission',
                },
                resolve: {
                  profile: UserProfileResolver
                }
              },
              {
                path: 'change-password',
                component: ChangePasswordComponent,
                canActivate: [UserPermissionGuard],
                data: {
                  permissions: [UserPermissions.MODIFY_USER_PROFILE],
                  redirectTo: '/admin/profiles/no-permission',
                },
                resolve: {
                  profile: UserProfileResolver
                }
              },
              {
                path: 'settings',
                component: UserSettingsComponent,
                resolve: {
                  profile: UserProfileResolver,
                  securityQuestions: SecurityQuestionResolver,
                  profileSettings: UserProfileSettingsResolver,
                  securityQuestionsAnswers: SettingsProfileSecurityQuestionResolver
                }
              },
              {
                path: 'kyc',
                component: ProfileKycComponent,
                resolve: {
                  verification: ProfileKycResolver,
                },
              },
              // {
              //   path: 'kyc',
              //   component: UserFilesComponent,
              //   resolve: {
              //     files: UserProfileFilesResolver,
              //     profile: UserProfileResolver,
              //     verification: UserVerificationResolver,
              //     userFileSizeLimitMb: UserFileSizeLimitResolver
              //   },
              // },
            ]
          }
        ]
      },

      {
        path: 'administrator-profiles',
        children: [
          {
            path: '',
            component: AdministratorProfilesComponent,
            canActivate: [UserPermissionGuard],
            data: {
              showTabs: true,
              permissions: [UserPermissions.VIEW_ADMIN_PROFILES],
              redirectTo: '/admin/profiles/administrator-profiles/no-permission',
            },
            resolve: {
              permissionGroups: PermissionGroupsResolver,
            },
          },
          {
            path: 'no-permission',
            component: NoPermissionComponent,
            data: {
              showTabs: true,
            },
          },
          {
            path: 'new-profile',
            component: NewAdministratorProfileComponent,
            canActivate: [UserPermissionGuard],
            data: {
              permissions: [UserPermissions.CREATE_ADMIN_PROFILES],
              redirectTo: '/admin/profiles/no-permission',
              crumbs: 'New administrator',
            },
            resolve: {
              permissionGroups: PermissionGroupsResolver
            }
          },
          {
            path: ':id',
            component: AdministratorDetailsComponent,
            canActivate: [UserPermissionGuard],
            resolve: {
              profile: UserProfileResolver,
            },
            data: {
              permissions: [UserPermissions.VIEW_ADMIN_PROFILES],
              redirectTo: '/admin/profiles/no-permission',
            },
            children: [
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'summary',
              },
              {
                path: 'summary',
                component: UserSummaryComponent,
                data: {
                  showTabs: true,
                },
                resolve: {
                  permissionGroups: PermissionGroupsResolver,
                  profile: UserProfileResolver
                },
              },
              {
                path: 'profile',
                component: NewAdministratorProfileComponent,
                canActivate: [UserPermissionGuard],
                data: {
                  permissions: [
                    UserPermissions.MODIFY_ADMIN_PROFILE,
                  ]
                },
                resolve: {
                  permissionGroups: PermissionGroupsResolver,
                  profile: UserProfileResolver
                },
              },
              {
                path: 'change-password',
                component: ChangePasswordComponent,
                canActivate: [UserPermissionGuard],
                data: {
                  permissions: [
                    UserPermissions.MODIFY_ADMIN_PROFILE,
                  ]
                },
                resolve: {
                  permissionGroups: PermissionGroupsResolver,
                  profile: UserProfileResolver
                },
              },
              {
                path: 'settings',
                component: AdminProfileSettingsComponent,
                resolve: {
                  profile: UserProfileResolver,
                  securityQuestions: SecurityQuestionResolver,
                  profileSettings: UserProfileSettingsResolver,
                  securityQuestionsAnswers: SettingsProfileSecurityQuestionResolver
                }
              },
              {
                path: 'files',
                component: UserFilesComponent,
                resolve: {
                  files: UserProfileFilesResolver,
                  profile: UserProfileResolver,
                  userFileSizeLimitMb: UserFileSizeLimitResolver
                }
              }
            ]
          }
        ],
      },

      {
        path: 'blocking',
        component: BlockingComponent,
        canActivate: [UserPermissionGuard],
        data: {
          showTabs: true,
          permissions: [UserPermissions.VIEW_UNBLOCK_BLOCKED_PROFILES],
          redirectTo: '/admin/profiles/blocking/no-permission',
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'users',
          },
          {
            path: 'users',
            component: BlockedUserProfilesComponent,
            data: {
              showTabs: true,
            },
            resolve: {
              profiles: BlockedProfilesResolver
            },
          },
          {
            path: 'ip-addresses',
            component: IpAddressesComponent,
            data: {
              showTabs: true,
            },
            resolve: {
              addresses: BlockedIpAddressesResolver
            }
          },
        ]
      },
      {
        path: 'blocking/no-permission',
        component: NoPermissionComponent,
        data: {
          showTabs: true,
        },
      },
      {
        path: 'no-permission',
        component: NoPermissionComponent,
      },
    ]
  },
];

