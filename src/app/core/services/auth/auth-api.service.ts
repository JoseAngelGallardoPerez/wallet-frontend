import { Injectable } from '@angular/core';
import { ApiCallerService } from '@services/api-caller.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '@app/config.service';
import { Observable } from 'rxjs';
import { AuthResponseInterface } from '@interfaces/auth-response-interface';
import { IBaseResponse } from '@interfaces/base-response-interface';
import { CallResponceInterface } from '@interfaces/callResponce.interface';
import {
  ChangePasswordInterface,
  ResetPasswordInterface,
  SetPasswordInterface,
  SetSecurityQuestionsInterface,
} from '@interfaces/set-password.interface';
import { ProfileModel } from '@models/profile-model';
import { TokenService } from '@services/token-service';
import { Verification } from '@constants/verification';

@Injectable()
export class AuthApiService {
  constructor(
    private http: HttpClient,
    private apiCallerService: ApiCallerService,
    private configService: ConfigService,
    private tokenService: TokenService,
  ) {
  }

  /**
   * Sign In
   * @param {any} email
   * @param {any} password
   * @returns {Observable<IBaseResponse<AuthResponseInterface | HttpErrorResponse>>}
   */
  public apiSignIn({ email, password }): Observable<CallResponceInterface> {
    const body = {
      data: {
        email: email.trim(),
        password: password,
      },
    };
    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.auth.login,
        body
      )
    ), 'apiSignIn');
  }

  public apiRootSignInAsUser(uid: string): Observable<CallResponceInterface> {
    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.auth.issueTokensForUserByUid(uid),
        {}
      )
    ), 'apiRootSignInAsUser');
  }

  public apiSignUp(request): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };

    return this.http.post(this.configService.config.api.auth.signup, request, httpOptions);
  }

  public apiGenerateSmsCode(): Observable<CallResponceInterface> {
    return this.apiCallerService.call(() => {
      return this.http.post(this.configService.config.api.auth.generateSmsCode, {});
    }, 'apiGenerateSmsCode');
  }

  public apiGenerateEmailCode(): Observable<CallResponceInterface> {
    return this.apiCallerService.call(() => {
      return this.http.post(this.configService.config.api.auth.generateEmailCode, {});
    }, 'apiGenerateEmailCode');
  }

  public apiSMSConfirmation(code: string): Observable<CallResponceInterface> {
    return this.apiCallerService.call(() => {
      return this.http.put(this.configService.config.api.auth.smsConfirmation, {
        code,
      });
    }, 'apiSMSConfirmation');
  }

  public apiEmailConfirmation(code: string): Observable<CallResponceInterface> {
    return this.apiCallerService.call(() => {
      return this.http.put(this.configService.config.api.auth.emailConfirmation, {
        code,
      });
    }, 'apiEmailConfirmation');
  }

  /**
   * Recover password for particular email
   * @param {string} email
   * @returns {Observable<any>}
   */
  public apiRecoverPassword(email: string) {
    const body = {
      email: email.trim(),
    };

    return this.apiCallerService.call(() => (

      this.http.post(
        this.configService.config.api.auth.forgotPassword,
        body
      )

    ), 'apiRecoverPassword');
  }

  /**
   * Update user
   * @returns {Observable<any>}
   */
  public apiPutUser(uid: string, profile: ProfileModel) {
    const headers = new HttpHeaders({
      'X-Tmp-Auth': this.tokenService.getTempAuthToken(),
    });

    return this.apiCallerService.call(() => (
      this.http.put(
        this.configService.config.api.auth.userById(uid),
        { data: profile },
        { headers }
      )
    ), 'apiPutUser');
  }

  public verificationLimitedFileUser(fileId: string, verificationType: Verification) {
    const headers = new HttpHeaders({
      'X-Tmp-Auth': this.tokenService.getTempAuthToken(),
    });

    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.auth.verification.authVerification,
        { fileId: fileId, verificationType: verificationType },
        { headers }
      )
    ), `verificationFileUser_${fileId}`);
  }

  public listVerificationFileUser() {
    const headers = new HttpHeaders({
      'X-Tmp-Auth': this.tokenService.getTempAuthToken(),
    });

    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.auth.verification.authVerification, { headers }
      )
    ), `listVerificationFileUser`);
  }

  public apiChangePassword(data: ChangePasswordInterface) {
    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.auth.changePassword,
        { data },
      )
    ), 'apiChangePassword');
  }

  public apiResetPassword(data: {
    code: string,
    password: string,
  }): Observable<CallResponceInterface> {
    const body = {
      confirmationCode: data.code,
      newPassword: data.password,
    };
    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.auth.resetPassword,
        body
      )
    ), 'apiResetPassword');
  }

  public apiResetPasswordById(data: ResetPasswordInterface): Observable<CallResponceInterface> {
    const body = {
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };

    return this.apiCallerService.call(() => (
      this.http.put(
        this.configService.config.api.auth.resetPasswordById(data.uid),
        body
      )
    ), 'apiResetPasswordById');
  }

  public apiConfirmationCode(link: string): Observable<CallResponceInterface> {
    return this.apiCallerService.call(() => (
      this.http.get(this.configService.config.api.auth.confirmationCode(link))
    ), 'apiConfirmationCode');
  }

  public apiSetPasswordFromOneTimeLink(link: string, body: SetPasswordInterface): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response',
      params: { code: link },
    };
    return this.http.post(
      this.configService.config.api.auth.setPasswordFromOneTime,
      body,
      httpOptions,
    );
  }

  public apiSetSecurityQuestionsAnswers(token: string, data: SetSecurityQuestionsInterface): Observable<CallResponceInterface> {
    const headers = new HttpHeaders({
      'X-Tmp-Auth': token,
    });

    return this.apiCallerService.call(() => (
      this.http.put(
        this.configService.config.api.auth.setSecurityQuestions,
        { data: [data] }, { headers }
      )
    ), 'apiSetSecurityQuestionsAnswers');
  }

  /**
   * Refresh token
   * @returns {Observable<any>}
   */
  public refreshAccessToken(token) {

    const headers = new HttpHeaders({
      'X-Refresh-Token': token,
    });
    return this.http.get(this.configService.config.api.auth.refreshToken, { headers });
  }

  public logout() {
    return this.http.delete(this.configService.config.api.auth.logout);
  }

  public apiGetCurrentCountryFromExternal(): Observable<Object> {
    return this.http.get(this.configService.config.api.externalApis.currentCountry);
  }
}
