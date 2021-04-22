import { Injectable } from '@angular/core';
import { CommonSettingsApiService } from '@shared-modules/common-settings-service/services/common-settings-api.service';
import { ApiCallerService } from '@services/api-caller.service';
import { ConfigService } from '@lib/config.service';
import { CallResponceInterface } from '@interfaces/callResponce.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UpdateExtensionsListInterface, UpdateExtensionsSettingsInterface } from '@extensions/interfaces/update-extensions.interface';

@Injectable()
export class ExtensionsApiService {

  constructor(
    private commonSettingsApiService: CommonSettingsApiService,
    private http: HttpClient,
    private apiCallerService: ApiCallerService,
    private configService: ConfigService,
  ) {
  }

  public apiGetExtensionsList(): Observable<CallResponceInterface> {
    const params = {
      include: 'hasSettings',
    };

    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.extensions.extensionsList,
        { params }
      )
    ), 'apiGetExtensionsList');
  }

  public apiUpdateExtensionsList(settingsData: UpdateExtensionsListInterface[]): Observable<CallResponceInterface> {
    const newSettingsData = { extensions: settingsData };

    return this.apiCallerService.call(() => (
      this.http.put(
        this.configService.config.api.extensions.extensionsList, newSettingsData,
      )
    ), 'apiUpdateExtensionsList');
  }

  public apiUpdateExtension(serviceName: string, isActive: boolean): Observable<CallResponceInterface> {
    const body = {
      isActive: isActive
    };

    return this.apiCallerService.call(() => (
      this.http.put(
        this.configService.config.api.extensions.extension(serviceName), body,
      )
    ), 'apiUpdateExtension');
  }

  public apiGetExtensionsSettingsList(serviceName: string): Observable<CallResponceInterface> {

    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.extensions.extensionsSettingsList(serviceName),
      )
    ), 'apiGetExtensionsSettingsList');
  }

  public apiUpdateExtensionsSettings(
    serviceName: string,
    settingsData: UpdateExtensionsSettingsInterface[],
  ): Observable<CallResponceInterface> {

    const newSettingsData = { settings: settingsData };

    return this.apiCallerService.call(() => (
      this.http.put(
        this.configService.config.api.extensions.extensionsSettings(serviceName), newSettingsData
      )
    ), 'apiUpdateExtensionsSettings');
  }

  public apiGetExtension(serviceName: string): Observable<CallResponceInterface> {
    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.extensions.extension(serviceName),
      )
    ), 'apiGetExtension');
  }

  public getExtensionsActivityStatus(url: string): Observable<CallResponceInterface> {
    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.extensions.getExtensionsActivityStatus(url),
      )
    ), 'getExtensionsActivityStatus');
  }

  public getExtensionsValidators(): Observable<CallResponceInterface> {
    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.extensions.accountNumberLength.getValidatorData,
      )
    ), 'getExtensionsValidators');
  }
}
