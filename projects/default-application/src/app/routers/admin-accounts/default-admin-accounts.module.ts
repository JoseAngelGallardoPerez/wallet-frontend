import { NgModule } from '@angular/core';
import { AdminAccountsModule } from '@lib/modules/admin-accounts/admin-accounts.module';
import { DefaultAdminAccountsRouting } from '@default-application-app/routers/admin-accounts/default-admin-accounts.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    AdminAccountsModule,
    RouterModule.forChild(DefaultAdminAccountsRouting),
  ]
})

export class DefaultAdminAccountsModule {
}
