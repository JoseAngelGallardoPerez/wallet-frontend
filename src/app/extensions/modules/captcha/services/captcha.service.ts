import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ConfigService } from '@lib/config.service';
import { ExtensionsApiService } from '@extensions/services/extensions-api.service';
import { CaptchaApiService } from '@extensions/modules/captcha/services/captcha.api.service';
import CaptchaInterface from '@extensions/modules/captcha/interfaces/captcha.interface';
import { CallResponceInterface } from '@interfaces/callResponce.interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class CaptchaService {

  public getCaptchaSubject: Subject<CaptchaInterface | null> = new Subject<CaptchaInterface | null>();

  constructor(
    private extensionsApiService: ExtensionsApiService,
    private captchaApiService: CaptchaApiService,
    private configService: ConfigService,
    private spinner: NgxSpinnerService,
  ) {
  }

  public checkCaptcha(): Observable<boolean> {
    return this.extensionsApiService.getExtensionsActivityStatus(this.configService.config.api.user.extensions.captchaActivity).pipe(
      map((data) => {
        return data.data ? data.data['isActive'] : null;
      }),
    );
  }

  public getCaptcha(): void {
    this.spinner.show();

    this.captchaApiService.getCaptcha().pipe(
      map((data: CallResponceInterface) => {
        this.spinner.hide();
        if (!data.error) {
          this.getCaptchaSubject.next(data.data as CaptchaInterface);
        }
        this.getCaptchaSubject.next(null);
      }),
    ).subscribe();
  }
}
