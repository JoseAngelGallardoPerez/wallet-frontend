import { SignUpResolver } from '@guards/signUp.resolver';
import { LoginComponent } from '@app/modules/auth/components/login/login.component';
import { SignupComponent } from '@app/modules/auth/components/signup/signup.component';
import { SimpleHeaderComponent } from '@app/modules/auth/components/simple-header/simple-header.component';
import { CheckMaintenanceGuard } from '@guards/maintenance-guards/check-maintenance.guard';
import { MaintenanceDisableGuard } from '@guards/maintenance-guards/maintenance-disable.guard';

export const DefaultAuthRouting = [
  {
    path: '',
    component: SimpleHeaderComponent,
    children: [
      {
        path: 'sign-in',
        component: LoginComponent,
        canActivate: [CheckMaintenanceGuard],
      },

      {
        path: 'root/sign-in',
        component: LoginComponent,
        canActivate: [MaintenanceDisableGuard],
      },

      {
        path: 'sign-up',
        component: SignupComponent,
        canActivate: [SignUpResolver, CheckMaintenanceGuard]
      }
    ]
  }
];
