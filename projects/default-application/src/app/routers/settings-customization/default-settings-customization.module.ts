import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomizationModule } from '@lib/modules/customization/customization.module';
import { DefaultSettingsCustomizationRouting } from '@default-routers/settings-customization/default-settings-customization.routing';

@NgModule({
  imports: [
    CustomizationModule,
    RouterModule.forChild(DefaultSettingsCustomizationRouting)]
})
export class DefaultSettingsCustomizationModule {
}
