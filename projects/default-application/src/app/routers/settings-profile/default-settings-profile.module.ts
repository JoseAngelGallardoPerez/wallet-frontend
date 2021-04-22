import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingsProfileModule } from '@lib/modules/settings-profile/settings-profile.module';
import { DefaultSettingsProfileRouting } from '@default-routers/settings-profile/default-settings-profile.routing';

@NgModule({
  imports: [
    SettingsProfileModule,
    RouterModule.forChild(DefaultSettingsProfileRouting)]
})
export class DefaultSettingsProfileModule {
}
