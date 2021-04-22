import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SystemConfigModule } from '@lib/modules/system-config/system-config.module';
import { DefaultSettingsSystemConfigRouting } from '@default-routers/settings-system-config/default-settings-system-config.routing';

@NgModule({
  imports: [
    SystemConfigModule,
    RouterModule.forChild(DefaultSettingsSystemConfigRouting)]
})
export class DefaultSettingsSystemConfigModule {
}
