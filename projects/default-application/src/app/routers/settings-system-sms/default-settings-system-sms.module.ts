import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultSettingsSystemSmsRouting } from '@default-routers/settings-system-sms/default-settings-system-sms.routing';
import { SystemSmsModule } from '@lib/modules/system-sms/system-sms.module';

@NgModule({
  imports: [
    SystemSmsModule,
    RouterModule.forChild(DefaultSettingsSystemSmsRouting)]
})
export class DefaultSettingsSystemSmsModule {
}
