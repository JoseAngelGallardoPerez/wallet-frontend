import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiCallerService } from '@services/api-caller.service';
import { ConfigService } from '@app/config.service';
import { Observable } from 'rxjs';
import { CallResponceInterface } from '@interfaces/callResponce.interface';
import { TokenService } from '@services/token-service';

@Injectable()
export class AuthFileApiService {

  public constructor(
    private http: HttpClient,
    private apiCallerService: ApiCallerService,
    private configService: ConfigService,
    private tokenService: TokenService
  ) {
  }

  public apiUploadFileToProfileSignUp(userId: string,
                                      formData: FormData): Observable<CallResponceInterface> {
    const headers = new HttpHeaders({
      'X-Tmp-Auth': this.tokenService.getTempAuthToken(),
    });
    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.auth.files.privateFile,
        formData,
        { headers }
      )
    ), 'apiUploadFileToProfileSignUp');
  }

  public apiDeleteFileFromProfileSignUp(fileId: string): Observable<CallResponceInterface> {
    const headers = new HttpHeaders({
      'X-Tmp-Auth': this.tokenService.getTempAuthToken(),
    });
    return this.apiCallerService.call(() => (
      this.http.delete(
        this.configService.config.api.files.limitedFilesById(fileId),
        { headers }
      )
    ), 'apiDeleteFileFromProfileSignUp');
  }
}
