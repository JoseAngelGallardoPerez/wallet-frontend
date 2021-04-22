import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsExtensionsPageComponent } from '@extensions/modules/settings-extensions-page-module/components/settings-extensions-page/settings-extensions-page.component';
import { SharedComponentsModule } from '@lib/modules/shared-components/shared-components.module';
import { SettingExtensionsPopupComponent } from '@extensions/modules/settings-extensions-page-module/components/setting-extensions-popup/setting-extensions-popup.component';
import { RootTabsComponent } from './components/root-tabs/root-tabs.component';
import { RouterModule } from '@angular/router';
import { SystemConfigModule } from '@lib/modules/system-config/system-config.module';
import { DynamicValidatorService } from '@services/dynamic-validator.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    SharedComponentsModule,
    SystemConfigModule,
  ],
  declarations: [
    SettingsExtensionsPageComponent,
    SettingExtensionsPopupComponent,
    RootTabsComponent,
  ],
  exports: [
    SettingsExtensionsPageComponent,
    RootTabsComponent,
  ],
  providers: [
    DynamicValidatorService,
  ]
})
export class SettingsExtensionsPageModule {
}
