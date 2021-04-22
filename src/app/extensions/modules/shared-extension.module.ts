import { ExtensionsService } from '@extensions/services/extensions.service';
import { NgModule } from '@angular/core';
import { ExtensionsApiService } from '@extensions/services/extensions-api.service';

@NgModule({
  providers: [
    ExtensionsApiService,
    ExtensionsService,
  ],
  exports: [
  ]
})
export class SharedExtensionModule {
}
