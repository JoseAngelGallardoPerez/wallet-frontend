import { NgModule } from '@angular/core';
import { CaptchaFieldsComponent } from './components/captcha-fields/captcha-fields.component';
import { CommonModule } from '@angular/common';
import { CaptchaService } from '@lib/extensions/modules/captcha/services/captcha.service';
import { SharedExtensionModule } from '@extensions/modules/shared-extension.module';
import { CaptchaApiService } from '@extensions/modules/captcha/services/captcha.api.service';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '@lib/modules/shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    SharedExtensionModule,
    TranslateModule,
  ],
  declarations: [
    CaptchaFieldsComponent,
  ],
  exports: [
    CaptchaFieldsComponent,
  ],
  providers: [
    CaptchaService,
    CaptchaApiService,
  ],
})
export class CaptchaModule {
}
