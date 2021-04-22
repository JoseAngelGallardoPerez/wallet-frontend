import { NgModule } from '@angular/core';
import { ExtensionSmsTanService } from '@extensions/modules/tan-by-sms-module/services/extension-sms-tan.service';
import { ExtensionSmsTanActivityResolver } from '@extensions/modules/tan-by-sms-module/resolvers/extension-sms-tan-activity.resolver';
import { ExtensionSmsTanActivityGuard } from '@extensions/modules/tan-by-sms-module/guards/extension-sms-tan-activity.guard';
import { CheckSmsTanActivityResolver } from '@extensions/modules/tan-by-sms-module/resolvers/check-sms-tan-activity.resolver';

@NgModule({
  providers: [
    ExtensionSmsTanActivityResolver,
    CheckSmsTanActivityResolver,
    ExtensionSmsTanActivityGuard,
    ExtensionSmsTanService,
  ]
})
export class ExtensionsTanBySmsModule {
}
