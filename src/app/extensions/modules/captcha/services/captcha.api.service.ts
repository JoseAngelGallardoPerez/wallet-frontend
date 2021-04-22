import { HttpClient } from '@angular/common/http';
import { ApiCallerService } from '@services/api-caller.service';
import { ConfigService } from '@lib/config.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CallResponceInterface } from '@interfaces/callResponce.interface';

@Injectable()
export class CaptchaApiService {
  constructor(
    private http: HttpClient,
    private apiCallerService: ApiCallerService,
    private configService: ConfigService,
  ) {
  }

  getCaptcha(): Observable<CallResponceInterface> {
    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.user.extensions.captchaGenerate,
        {}
      )
    ), 'getCaptcha');
  }
}
