import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingsFeeModule } from '@lib/modules/settings-fee/settings-fee.module';
import { DefaultSettingsFeeRouting } from '@default-routers/settings-fee/default-settings-fee.routing';

@NgModule({
  imports: [
    SettingsFeeModule,
    RouterModule.forChild(DefaultSettingsFeeRouting)]
})
export class DefaultSettingsFeeModule {
}
