import { NgModule } from '@angular/core';
import { DefaultAuthRouting } from './default-auth.routing';
import { AuthRouting } from './auth.routing';
import { AuthModule } from '@app/modules/auth/auth.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forChild(DefaultAuthRouting),
    RouterModule.forChild(AuthRouting)
  ],
})

export class DefaultAuthModule {
}
