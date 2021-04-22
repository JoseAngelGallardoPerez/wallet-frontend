import { NgModule } from '@angular/core';
import { SettingsExtensionsPageModule } from '@extensions/modules/settings-extensions-page-module/settings-extensions-page.module';
import { RouterModule } from '@angular/router';
import { DefaultSettingsExtensionsRouting } from '@default-routers/settings-extensions/default-settings-extensions.routing';
import { SettingsExtensionsResolver } from '@extensions/modules/settings-extensions-page-module/resolvers/settings-extensions.resolver';
import { SharedExtensionModule } from '@extensions/modules/shared-extension.module';
import { ExtensionsApiService } from '@extensions/services/extensions-api.service';

@NgModule({
  imports: [
    SettingsExtensionsPageModule,
    SharedExtensionModule,
    RouterModule.forChild(DefaultSettingsExtensionsRouting),
  ],
  providers: [
    SettingsExtensionsResolver,
    ExtensionsApiService,
  ]
})
export class DefaultSettingsExtensionsModule {

}
