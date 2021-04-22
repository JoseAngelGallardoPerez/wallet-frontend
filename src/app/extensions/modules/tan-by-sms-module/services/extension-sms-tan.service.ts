import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders as Headers } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from '@lib/config.service';
import { ApiCallerService } from '@services/api-caller.service';
import { CallResponceInterface } from '@interfaces/callResponce.interface';

@Injectable()
export class ExtensionSmsTanService {

  public hashSmsTanActivity: boolean;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private apiCallerService: ApiCallerService,
  ) {
  }

  public requestTan(): Observable<boolean> {
    return this.apiRequestTan().pipe(
      map((data: CallResponceInterface) => {
        if (!data.error) {
          return true;
        }
        return false;
      })
    );
  }

  public requestTanAvailability(): Observable<any> {
    return this.apiRequestTanAvailability().pipe(
      map((data: CallResponceInterface) => {
        if (!data.error) {
          return data.data;
        }
        return;
      })
    );
  }

  public checkSmsTanActivity(): Observable<boolean> {
    if (this.hashSmsTanActivity === undefined) {
      return this.getSmsTanActivity();
    } else {
      return of(this.hashSmsTanActivity);
    }
  }

  public getSmsTanActivity(): Observable<boolean> {
    return this.apiGetSmsTanActivity().pipe(
      map((data: CallResponceInterface) => {
        if (!data.error) {
          this.hashSmsTanActivity = data.data['isActive'];
          return this.hashSmsTanActivity;
        }
        return true;
      })
    );
  }

  public apiGetSmsTanActivity(): Observable<CallResponceInterface> {
    return this.apiCallerService.call(() => (
      this.http.get(this.configService.config.api.account.tanExtensionActivityStatus)
    ), 'apiGetSmsTanActivity');
  }

  public apiRequestTan(): Observable<CallResponceInterface> {
    const headers = new Headers();
    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.account.requestTan,
        {},
        { headers }
      )
    ), 'apiRequestTan');
  }

  public apiRequestTanAvailability(): Observable<CallResponceInterface> {
    return this.apiCallerService.call(() => (
      this.http.get(this.configService.config.api.account.requestTanAvailability)
    ), 'apiRequestTanAvailability');
  }
}
