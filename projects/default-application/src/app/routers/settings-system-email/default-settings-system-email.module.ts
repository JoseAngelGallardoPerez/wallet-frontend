import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SystemEmailModule } from '@lib/modules/system-email/system-email.module';
import { DefaultSettingsSystemEmailRouting } from '@default-routers/settings-system-email/default-settings-system-email.routing';

@NgModule({
  imports: [
    SystemEmailModule,
    RouterModule.forChild(DefaultSettingsSystemEmailRouting)]
})
export class DefaultSettingsSystemEmailModule {
}
