import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingsTanModule } from '@lib/modules/settings-tan/settings-tan.module';
import { DefaultSettingsTanRouting } from '@default-routers/settings-tan/default-settings-tan.routing';
import { ExtensionsTanBySmsModule } from '@lib/extensions/modules/tan-by-sms-module/extensions-tan-by-sms.module';

@NgModule({
  imports: [
    SettingsTanModule,
    ExtensionsTanBySmsModule,
    RouterModule.forChild(DefaultSettingsTanRouting)]
})
export class DefaultSettingsTanModule {
}
