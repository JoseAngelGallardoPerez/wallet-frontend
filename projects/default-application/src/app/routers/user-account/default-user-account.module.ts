import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultUserAccountRouting } from '@default-routers/user-account/default-user-account.routing';
import { UserAccountModule } from '@lib/modules/user-account/user-account.module';

@NgModule({
  imports: [
    UserAccountModule,
    RouterModule.forChild(DefaultUserAccountRouting)]
})
export class DefaultUserAccountModule {
}
