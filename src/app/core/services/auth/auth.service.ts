import { Injectable } from '@angular/core';
import { AuthApiService } from '@services/auth/auth-api.service';
import { Observable, of, Subject } from 'rxjs';
import { TokenService } from '@services/token-service';
import { TokenInterface } from '@interfaces/token-interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CallResponceInterface } from '@interfaces/callResponce.interface';
import { ApiError } from '@models/api-error.model';
import { catchError, exhaustMap, filter, map, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as FromLogout from '@app/reducers/app.reducer';
import * as FromApp from '@app/reducers/app.reducer';
import * as LogoutActions from '@app/actions/logout.actions';
import * as UserPermissionsActions from '@app/actions/permission.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'angular2-notifications';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ErrorHandlerService } from '@services/error-handler.service';
import { TEMP_AUTH_HEADER_NAME } from '@app/core/constants/signUp';
import { AppOptionsService } from '@services/appOptions.service';
import { SecurityQuestionApiService } from '@shared-modules/profile-form/services/security-question-api.service';
import { SecurityQuestion } from '@models/security-question.model';
import {
  ChangePasswordInterface,
  ResetPasswordInterface,
  SetPasswordInterface,
} from '@interfaces/set-password.interface';
import { ProfileModel } from '@models/profile-model';
import { Verification } from '@constants/verification';
import { VerificationModel } from '@models/verification-model';
import { CountryFromApi } from '@interfaces/country.interface';

@Injectable()
export class AuthService {

  public currentUserFullNameSubject: Subject<string> = new Subject<string>();
  private currentUserFullName: string;
  private tempAuthToken: string;
  private tempUserId: string;
  private signOutSubject: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authApiService: AuthApiService,
    private tokenService: TokenService,
    private helper: JwtHelperService,
    private router: Router,
    private store: Store<FromLogout.LogoutState>,
    private permissionsStore: Store<FromApp.UserPermissionsState>,
    private spinner: NgxSpinnerService,
    private notificationsService: NotificationsService,
    private appOptionService: AppOptionsService,
    private securityQuestionApi: SecurityQuestionApiService,
  ) {
    this.subscribeToSignOut();
  }

  public hasTempAuthToken(): boolean {
    return !!this.tempAuthToken;
  }

  public getTempAuthToken(): string {
    return this.tempAuthToken;
  }

  public setTempAuthToken(token: string): void {
    this.tempAuthToken = token;
  }

  public signIn(data): Observable<{ success: boolean, data?: any }> {
    return this.authApiService.apiSignIn(data).pipe(
      map((res: CallResponceInterface) => {
        if (res.error) {
          return { success: false, data: <ApiError[]>res.data };
        } else {
          const isSaved = this.saveToken(res);
          if (isSaved) {
            this.store.dispatch(new LogoutActions.LogIn());
            this.notificationsService.remove();
            this.tempAuthToken = null;
            this.tempUserId = null;
            if (this.isAdmin()) {
              this.permissionsStore.dispatch(new UserPermissionsActions.LoadUserPermissions());
            }
          }
          return { success: isSaved, data: res.data };
        }
      }),
    );
  }

  public rootSignInAsUser(uid: string): Observable<{ success: boolean, data?: any }> {
    return this.authApiService.apiRootSignInAsUser(uid).pipe(
      map((res: CallResponceInterface) => {
        if (res.error) {
          return { success: false, data: <ApiError[]>res.data };
        } else {
          const isSaved = this.saveToken(res);
          if (isSaved) {
            this.store.dispatch(new LogoutActions.LogIn());
            this.notificationsService.remove();
            this.tempAuthToken = null;
            this.tempUserId = null;
            if (this.isAdmin()) {
              this.permissionsStore.dispatch(new UserPermissionsActions.LoadUserPermissions());
            }
          }
          return { success: isSaved, data: res.data };
        }
      }),
    );
  }

  public signUp(signUpData): Observable<{ data: any | ApiError[], error: boolean }> {
    return this.authApiService.apiSignUp(signUpData)
      .pipe(map(
        (response: HttpResponse<{ messages: string[], data: object }>) => {
          this.tokenService.saveToken({
            accessToken: response.body.data['accessToken'],
            refreshToken: response.body.data['refreshToken'],
          });
          return { data: response.body && response.body.data || {}, error: false };
        }),
        catchError((error: HttpErrorResponse) => {
          const errors: ApiError[] = error && error.error && error.error.errors ?
            ErrorHandlerService.generateApiErrors(error.error.errors) : [];
          return of({ data: errors || {}, error: true });
        }));
  }

  public generateSmsCode(): Observable<CallResponceInterface> {
    this.spinner.show();
    return this.authApiService.apiGenerateSmsCode().pipe(
      tap(() => this.spinner.hide()),
    );
  }

  public generateEmailCode(): Observable<CallResponceInterface> {
    this.spinner.show();
    return this.authApiService.apiGenerateEmailCode().pipe(
      tap(() => this.spinner.hide()),
    );
  }

  public confirmSMSNumber(code: string): Observable<CallResponceInterface> {
    return this.authApiService.apiSMSConfirmation(code);
  }

  public confirmEmailCode(code: string): Observable<CallResponceInterface> {
    return this.authApiService.apiEmailConfirmation(code);
  }

  public updateUserSignUp(uid: string, profile: any): Observable<CallResponceInterface> {
    return this.authApiService.apiPutUser(uid, profile);
  }

  public verificationLimitedUserSignUp(fileId: string, verificationType: Verification): Observable<CallResponceInterface> {
    return this.authApiService.verificationLimitedFileUser(fileId, verificationType);
  }

  public listVerificationUserSignUp(): Observable<VerificationModel[]> {
    return this.authApiService.listVerificationFileUser();
  }

  public recoverPassword({ email }): Observable<CallResponceInterface> {
    return this.authApiService.apiRecoverPassword(email);
  }

  public resetPassword(data: {
    code: string,
    password: string
  }): Observable<CallResponceInterface> {
    return this.authApiService.apiResetPassword(data);
  }

  public resetPasswordById(data: ResetPasswordInterface): Observable<CallResponceInterface> {
    this.spinner.show();

    return this.authApiService.apiResetPasswordById(data).pipe(
      tap(({ error }: CallResponceInterface) => {
        this.spinner.hide();
        if (!error) {
          this.notificationsService.success('Password', 'Was successfully changed.');
        }
      }),
    );
  }

  public changePassword(data: ChangePasswordInterface): Observable<CallResponceInterface> {
    this.spinner.show();

    return this.authApiService.apiChangePassword(data).pipe(
      tap(({ error }: CallResponceInterface) => {
        this.spinner.hide();
        if (!error) {
          this.notificationsService.success('Password', 'Was successfully changed.');
        }
      }),
    );
  }

  public loadSecurityQuestions(): Observable<SecurityQuestion[]> {
    return this.securityQuestionApi.apiLoadSecurityQuestions().pipe(
      map((data) => {
        return data.data;
      }),
    );
  }

  public getConfirmationCode(link: string): Observable<any> {
    this.spinner.show();
    return this.authApiService.apiConfirmationCode(link).pipe(
      tap(() => {
        this.spinner.hide();
      }),
      map((data) => {
        if (data.error) {
          this.router.navigate(['/forgot-password']);
        }
        return data.data;
      }),
    );
  }

  public setPasswordFromOneTimeLink(link: string, data: SetPasswordInterface): void {
    this.authApiService.apiSetPasswordFromOneTimeLink(link, data).pipe(
      map((response: HttpResponse<{ messages: string[], data: object }>) => {
        const tempSetPasswordToken = response.headers.get(TEMP_AUTH_HEADER_NAME);
        this.setSecurityQuestionsAnswers(tempSetPasswordToken, data);
      }),
      catchError((error: HttpErrorResponse) => {
        const errors: ApiError[] = error && error.error && error.error.errors
          ? ErrorHandlerService.generateApiErrors(error.error.errors) : [];
        this.router.navigate(['/forgot-password']);
        return of({ data: errors || {}, error: true });
      }),
    ).subscribe();
  }

  public setSecurityQuestionsAnswers(token: string, data: any) {
    delete data.proposedPassword;
    delete data.confirmPassword;
    this.authApiService.apiSetSecurityQuestionsAnswers(token, data).pipe(
      tap(({ error }: CallResponceInterface) => {
        if (!error) {
          this.notificationsService.success('Password And Security Question', 'was successfully saved.');
        }
        this.router.navigate(['/sign-in']);
      }),
    ).subscribe();
  }

  public logOut(): void {
    this.signOutSubject.next(true);
  }

  public refreshAccessToken(): Observable<Object> {
    return this.authApiService.refreshAccessToken(this.getRefreshToken());
  }

  public saveToken(res): boolean {
    try {
      this.tokenService.saveTokenFromResponse(res);
    } catch (e) {
      return false;
    }
    return true;
  }

  public isAuthenticated(): boolean {
    return this.tokenService.isTokenStored();
  }

  public getAccessToken(): string | null {
    const token: TokenInterface | null = this.tokenService.getToken();
    return token ? token.accessToken : null;
  }

  public getRefreshToken(): string | null {
    const token: TokenInterface | null = this.tokenService.getToken();
    return token ? token.refreshToken : null;
  }

  public isAdmin(): boolean {
    const decodedToken = this.decodeToken(this.getAccessToken());
    return decodedToken && (
      decodedToken['roleName'] === 'admin'
      || decodedToken['roleName'] === 'root');
  }

  public isRoot(): boolean {
    const decodedToken = this.decodeToken(this.getAccessToken());
    return decodedToken && (decodedToken['roleName'] === 'root');
  }

  public isClient(): boolean {
    const decodedToken = this.decodeToken(this.getAccessToken());
    return decodedToken && (decodedToken['roleName'] === 'client');
  }

  public isMainUser(): boolean {
    const decodedToken = this.decodeToken(this.getAccessToken());
    return decodedToken && (decodedToken['roleName'] !== 'admin') && (decodedToken['roleName'] !== 'root');
  }

  public getUserRole(): string {
    return this.decodeToken(this.getAccessToken())['roleName'];
  }

  public getFullName(): string {
    if (!this.currentUserFullName) {
      const decodedToken = this.decodeToken(this.getAccessToken());
      return decodedToken ? `${ decodedToken['firstName'] } ${ decodedToken['lastName'] }` : '';
    }

    return this.currentUserFullName;
  }

  public currentUserId(): string | null {
    const decodedToken = this.decodeToken(this.getAccessToken());
    return decodedToken ? decodedToken['uid'] ?
      decodedToken['uid'] : null : null;
  }

  public getCurrentUsername(): string {
    const decodedToken = this.decodeToken(this.getAccessToken());
    return decodedToken ? decodedToken['username'] : '';
  }

  public checkFullNameUpdate(isMyProfile: boolean, profile: ProfileModel, updatedProfile: ProfileModel): void {
    if (isMyProfile && (profile.firstName !== updatedProfile.firstName || profile.lastName !== updatedProfile.lastName)) {
      this.updateCurrentUserFullName(`${ updatedProfile.firstName } ${ updatedProfile.lastName }`);
    }
  }

  public getCurrentCountryFromExternalApi(): Observable<CountryFromApi> {
    return this.authApiService.apiGetCurrentCountryFromExternal().pipe(
      catchError(() => of(null)),
    );
  }

  private updateCurrentUserFullName(fullName: string): void {
    this.currentUserFullNameSubject.next(fullName);
    this.currentUserFullName = fullName;

    this.refreshAccessToken().subscribe((res: any) => {
      if (!this.saveToken(res)) {
        this.logOut();
      }
    });
  }

  private decodeToken(token: string): { [key: string]: string } {
    return this.helper.decodeToken(token);
  }

  private logoutFromSystem(dispatch = false) {
    this.tokenService.removeToken();
    this.appOptionService.clearOptions();
    if (dispatch) {
      this.store.dispatch(new LogoutActions.LogOut(false));
    }
  }

  private subscribeToSignOut() {
    this.signOutSubject.asObservable()
      .pipe(
        filter(() => this.isAuthenticated()),
        tap(() => this.spinner.show()),
        exhaustMap((dispath: boolean) => {
          return this.authApiService.logout()
            .pipe(
              catchError(() => of(null)),
              take(1),
              tap(() => {
                this.logoutFromSystem(dispath);
                this.spinner.hide();
              }));
        }))
      .subscribe();
  }
}
