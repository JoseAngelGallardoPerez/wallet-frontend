import { ForgotPasswordComponent } from '@lib/modules/auth/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '@app/modules/auth/components/change-password/reset-password.component';
import { CheckMaintenanceGuard } from '@guards/maintenance-guards/check-maintenance.guard';
import { UserSetPasswordAndSecurityQuestionComponent } from '@lib/modules/auth/components/user-set-password-and-security-question/user-set-password-and-security-question.component';
import { MainContainerComponent } from '@lib/modules/shared-components/main-container/main-container.component';
import { SignupAccountDetailsComponent } from '@lib/modules/auth/components/signup-account-details/signup-account-details.component';
import { CompleteRegistrationComponent } from '@lib/modules/auth/components/complete-registration/complete-registration.component';
import { SuccessComponent } from '@lib/modules/shared-components/success/success.component';
import { AuthVerificationResolver } from '@lib/modules/auth/resolvers/auth-verification.resolver';
import { AuthProfileResolver } from '@lib/modules/auth/resolvers/auth.profile.resolver';
import { SmsConfirmationComponent } from '@lib/modules/auth/components/sms-confirmation/sms-confirmation.component';

export const AuthRouting = [
  {
    path: '',
    component: MainContainerComponent,
    children: [
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [CheckMaintenanceGuard],
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'sign-up/account-details',
        component: SignupAccountDetailsComponent,
        data: {
          myProfile: true,
        },
        resolve: {
          profile: AuthProfileResolver
        }
      },
      {
        path: 'sign-up/complete-registration',
        component: CompleteRegistrationComponent,
        data: {
          myProfile: true,
        },
        resolve: {
          verification: AuthVerificationResolver,
          profile: AuthProfileResolver
        }
      },
      {
        path: 'sign-up/sms-confirmation',
        component: SmsConfirmationComponent,
      },
      {
        path: 'success',
        component: SuccessComponent,
      },
      {
        path: 'password-set/:id',
        component: UserSetPasswordAndSecurityQuestionComponent
      },
    ]
  }
];
