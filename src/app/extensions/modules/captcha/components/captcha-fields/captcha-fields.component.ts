import { Component, Input, OnDestroy } from '@angular/core';
import { CaptchaService } from '@lib/extensions/modules/captcha/services/captcha.service';
import { UnsubscribeDestroyHelper } from '@helpers/unsubscribe-destroy.helper';
import { takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import CaptchaInterface from '@extensions/modules/captcha/interfaces/captcha.interface';
import { Subject } from 'rxjs';
import { ApiError } from '@models/api-error.model';
import { ErrorCodes } from '@constants/errorCodes';

@Component({
  selector: 'app-captcha-fields',
  templateUrl: './captcha-fields.component.html',
  styleUrls: ['./captcha-fields.component.scss'],
})
export class CaptchaFieldsComponent extends UnsubscribeDestroyHelper implements OnDestroy {

  @Input() form: FormGroup;
  @Input() generateNewCaptcha: boolean;
  @Input() errorSubject: Subject<ApiError[]>;

  public showCaptchaFields: boolean;
  public captchaImgBase64: string;
  public tempBlockButtonReset: boolean;
  private resetCount = 0;
  private timeOutSubscribe: NodeJS.Timer;

  constructor(
    private captchaService: CaptchaService,
  ) {
    super();
    this.checkCaptcha();
  }

  ngOnDestroy() {
    clearTimeout(this.timeOutSubscribe);
  }

  public captchaRefresh(): void {
    if (!this.tempBlockButtonReset) {
      this.captchaService.getCaptcha();
      this.resetCount++;
      this.form.get('captchaValue').reset();

      if (this.resetCount > 10) {
        this.setTempBlocker();
      }
    }
  }

  private setTempBlocker(): void {
    this.tempBlockButtonReset = true;

    this.timeOutSubscribe = setTimeout(() => {
      this.tempBlockButtonReset = false;
    }, 5000);
  }

  private checkCaptcha(): void {
    this.captchaService.checkCaptcha().pipe(
      takeUntil(this.unsubscribeSubject),
    ).subscribe((isActive: boolean) => {
      if (isActive) {
        this.addCaptchaFieldsToForm();
        this.showCaptchaFields = true;
        this.subscribeToCaptcha();
        this.captchaService.getCaptcha();
      }
    });
  }

  private addCaptchaFieldsToForm() {
    this.form.addControl('captchaKey', new FormControl(null));
    this.form.addControl('captchaValue', new FormControl(null, [Validators.required]));
    this.subscribeToFormError();
  }

  private subscribeToCaptcha(): void {
    this.captchaService.getCaptchaSubject.pipe(
      takeUntil(this.unsubscribeSubject),
    ).subscribe((data: CaptchaInterface | null) => {
      if (data) {
        this.captchaImgBase64 = data.data;
        this.form.get('captchaKey').setValue(data.key);
      }
    });
  }

  private subscribeToFormError(): void {
    this.errorSubject.pipe(
      takeUntil(this.unsubscribeSubject),
    ).subscribe((errors: ApiError[]) => {
      this.captchaService.getCaptcha();

      if (errors.find((error: ApiError) => error.source === 'captchaValue')) {
        this.form.get('captchaValue').setErrors({ [ErrorCodes.INVALID_CAPTCHA]: true });
      } else {
        errors.forEach((error: ApiError) => {
          if (error.source !== 'captchaValue' && this.form.get(error.source)) {
            this.form.get(error.source).setErrors({ [ErrorCodes[error.code]]: true });
          }
        });
      }
    });
  }
}
