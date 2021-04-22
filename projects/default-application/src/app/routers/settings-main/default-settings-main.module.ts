import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultSettingsMainRouting } from '@default-routers/settings-main/default-settings-main.routing';
import { SettingsMainModule } from '@lib/modules/settings-main/settings-main.module';

@NgModule({
  imports: [
    SettingsMainModule,
    RouterModule.forChild(DefaultSettingsMainRouting)]
})
export class DefaultSettingsMainModule {
}
