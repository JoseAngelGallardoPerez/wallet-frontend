import { Injectable } from '@angular/core';
import { ExtensionsApiService } from '@extensions/services/extensions-api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, tap } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { CallResponceInterface } from '@interfaces/callResponce.interface';
import { Observable } from 'rxjs';
import { UpdateExtensionsListInterface, UpdateExtensionsSettingsInterface } from '@extensions/interfaces/update-extensions.interface';
import { ExtensionsSettingInterface } from '@extensions/interfaces/extensions-settings.interface';

@Injectable()
export class ExtensionsService {

  constructor(
    private extensionsApi: ExtensionsApiService,
    private spinner: NgxSpinnerService,
    private notification: NotificationsService,
  ) {

  }

  public updateExtensionsList(settingsData: UpdateExtensionsListInterface[]): any {
    this.spinner.show();
    return this.extensionsApi.apiUpdateExtensionsList(settingsData).pipe(
      tap((data) => {
        this.spinner.hide();
        if (!data.error) {
          this.notification.success('Settings', 'Successfully updated.');
        }
      }),
    );
  }

  public updateExtension(serviceName: string, isActive: boolean): any {
    this.spinner.show();
    return this.extensionsApi.apiUpdateExtension(serviceName, isActive).pipe(
      tap((data) => {
        this.spinner.hide();
        if (!data.error) {
          this.notification.success('Settings', 'Successfully updated.');
        }
      }),
    );
  }

  public getExtension(serviceName: string): any {
    this.spinner.show();
    return this.extensionsApi.apiGetExtension(serviceName).pipe(
      tap(() => this.spinner.hide()),
    );
  }

  public getExtensionsSettingsList(serviceName: string): any {
    this.spinner.show();
    return this.extensionsApi.apiGetExtensionsSettingsList(serviceName).pipe(
      map((data: CallResponceInterface) => {
        if (!data.error) {
          return data.data;
        }
      }),
      tap(() => this.spinner.hide()),
    );
  }

  public updateExtensionsSettings(serviceName: string, formData: { [key: string]: string }): Observable<CallResponceInterface> {
    this.spinner.show();
    const settingsData: UpdateExtensionsSettingsInterface[] = this.convertToPutSettingsFormat(formData);
    return this.extensionsApi.apiUpdateExtensionsSettings(serviceName, settingsData).pipe(
      tap((data: CallResponceInterface) => {
        this.spinner.hide();
        if (!data.error) {
          this.notification.success('Settings', 'Successfully updated.');
        }
      }),
    );
  }

  public convertToSetExtensionsFormat(
    listExtensions: ExtensionsSettingInterface[],
    formData: { [key: string]: boolean },
  ): UpdateExtensionsListInterface[] {
    const settingsData: UpdateExtensionsListInterface[] = [];
    listExtensions.forEach((extension: ExtensionsSettingInterface) => {
      if (extension.isActive !== formData[extension.serviceName]) {
        settingsData.push({ serviceName: extension.serviceName, isActive: formData[extension.serviceName] });
      }
    });
    return settingsData;
  }

  private convertToPutSettingsFormat(formData: { [key: string]: string }): UpdateExtensionsSettingsInterface[] {
    const settingsData: UpdateExtensionsSettingsInterface[] = [];
    Object.keys(formData).forEach((fieldName) => {
      settingsData.push({ name: fieldName, value: formData[fieldName] });
    });
    return settingsData;
  }

  public valueToType(type: string, value: any): any {
    switch (type) {
      case 'int32':
        return parseInt(value, 10);
      case 'float32':
        return parseFloat(value);
      case 'string':
        return String(value);
      case 'bool':
        return Boolean(value);
      default:
        throw new Error('Undefined extension setting data type');
    }
  }
}
