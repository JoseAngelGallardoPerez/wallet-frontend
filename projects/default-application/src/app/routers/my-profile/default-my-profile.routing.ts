import { MyDetailsComponent } from '@lib/modules/my-profile/components/my-details/my-details.component';
import { MyProfileResolver } from '@lib/modules/my-profile/resolvers/myProfileResolver';
import { UserSummaryComponent } from '@shared-modules/profile-form/components/user-summary/user-summary.component';
import { MyProfileComponent } from '@lib/modules/my-profile/components/my-profile.component';
import { AdminProfileEditRouteGuard } from '@shared-modules/profile-form/guard/admin-profile-edit-route.guard';
import { UserFilesComponent } from '@lib/modules/profiles/components/user-profiles/details/user-files/user-files.component';
import { UserProfileFilesResolver } from '@lib/modules/profiles/resolvers/user-profile-files.resolver';
import { UserVerificationResolver } from '@lib/modules/profiles/resolvers/user-verification.resolver';
import { ChangePasswordComponent } from '@lib/modules/profiles/components/user-profiles/change-password/change-password.component';

export const DefaultMyProfileRouting = [

  {
    path: '',
    component: MyDetailsComponent,
    data: {
      isMyProfilePage: true,
      crumbs: 'My Profile'
    },
    resolve: {
      profile: MyProfileResolver,
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
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'profile',
        canActivate: [AdminProfileEditRouteGuard],
        component: MyProfileComponent,
      },
      // {
      //   data: {
      //     crumbs: 'Settings'
      //   },
      //   path: ':id/settings',
      //   component: UserSettingsComponent,
      //   canActivate: [AdminProfileSettingsRouteGuard],
      //   resolve: {
      //     securityQuestions: SecurityQuestionResolver,
      //     profileSettings: MyProfileSettingsResolver,
      //     securityQuestionsAnswers: MySettingsProfileSecurityQuestionResolver
      //   }
      // },
      // {
      //   path: 'admin-profile',
      //   canActivate: [AdminRoleGuard],
      //   resolve: {
      //     permissionGroups: PermissionGroupsResolver,
      //     profile: MyProfileResolver,
      //   },
      //   component: NewAdministratorProfileComponent,
      // },
      // {
      //   path: 'admin-settings',
      //   component: AdminProfileSettingsComponent,
      //   canActivate: [AdminRoleGuard],
      //   data: {
      //     isMyProfile: true,
      //   },
      //   resolve: {
      //     securityQuestions: SecurityQuestionResolver,
      //     profileSettings: MyProfileSettingsResolver,
      //     securityQuestionsAnswers: MySettingsProfileSecurityQuestionResolver
      //   }
      // },
    ]
  }
];
