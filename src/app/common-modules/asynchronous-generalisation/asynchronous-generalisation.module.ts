import { NgModule } from '@angular/core';
import { AsynchronousService } from '@lib/common-modules/asynchronous-generalisation/services/asynchronous.service';
import { AsynchronousApiService } from '@lib/common-modules/asynchronous-generalisation/services/asynchronous-api.service';
import { SpinnerTextDirective } from '@lib/common-modules/asynchronous-generalisation/directive/spinner-text.directive';

@NgModule({
  declarations: [
    SpinnerTextDirective,
  ],
  exports: [
    SpinnerTextDirective,
  ],
  providers: [
    AsynchronousService,
    AsynchronousApiService,
  ]
})
export class AsynchronousGeneralisationModule {
}
