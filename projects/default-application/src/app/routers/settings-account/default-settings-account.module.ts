import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingsAccountModule } from '@lib/modules/settings-account/settings-account.module';
import { DefaultSettingsAccountRouting } from '@default-routers/settings-account/default-settings-account.routing';

@NgModule({
  imports: [
    SettingsAccountModule,
    RouterModule.forChild(DefaultSettingsAccountRouting)]
})
export class DefaultSettingsAccountModule {
}
