import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { ExtensionsService } from '@extensions/services/extensions.service';
import { UnsubscribeDestroyHelper } from '@helpers/unsubscribe-destroy.helper';
import { ExtensionsSettingInterface } from '@extensions/interfaces/extensions-settings.interface';
import { UpdateExtensionsListInterface } from '@extensions/interfaces/update-extensions.interface';
import { ExtensionsServiceSettingInterface } from '@extensions/interfaces/extensions-service-setting.interface';

@Component({
  selector: 'app-settings-extensions-page',
  templateUrl: './settings-extensions-page.component.html',
  styleUrls: [
    '../../../../../modules/settings-profile/components/user-options/user-options.component.scss',
    './settings-extensions-page.component.scss',
  ]
})
export class SettingsExtensionsPageComponent extends UnsubscribeDestroyHelper implements OnInit {

  public extensionsForm: FormGroup;
  public iconColorEnabled = '#9b9b9b';
  public iconColorDisabled = '#b6b6b6';
  public listExtensions: ExtensionsSettingInterface[];
  public showPopup = false;
  public dataForPopup: ExtensionsServiceSettingInterface[];
  public titleForPopup: string;
  public serviceName: string;

  constructor(
    private fb: FormBuilder,
    private extensionsService: ExtensionsService,
    private route: ActivatedRoute,
    private notification: NotificationsService,
  ) {
    super();
    this.listExtensions = [...this.route.snapshot.data.extensions];
    this.formInit();
  }

  ngOnInit() {
  }

  public onHidePopup() {
    this.showPopup = false;
    this.dataForPopup = null;
  }

  public submit() {
    const setData: UpdateExtensionsListInterface[]
      = this.extensionsService.convertToSetExtensionsFormat(this.listExtensions, this.extensionsForm.value);
    this.extensionsService.updateExtensionsList(setData)
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe((data) => {
        if (!data.error) {
          this.listExtensions.forEach((extension: ExtensionsSettingInterface) => {
            extension.isActive = this.extensionsForm.get(extension.serviceName).value;
          });
        }
      });
  }

  public resetFormData(): void {
    this.listExtensions.forEach((extension: ExtensionsSettingInterface) => {
      this.extensionsForm.get(extension.serviceName).setValue(extension.isActive);
    });
  }

  public getSettingExtension(extension: ExtensionsSettingInterface): void {
    if (extension.hasSettings) {
      this.extensionsService.getExtensionsSettingsList(extension.serviceName).subscribe((data) => {
        if (data.length) {
          this.showPopup = true;
          [...this.dataForPopup] = [...data];
          this.titleForPopup = extension.name;
          this.serviceName = extension.serviceName;
        } else {
          this.notification.alert('The Setting', 'not have data');
        }
      });
    }
  }

  private formInit() {
    this.extensionsForm = this.fb.group({});
    if (this.listExtensions && this.listExtensions.length) {
      this.listExtensions.forEach((extension: ExtensionsSettingInterface) => {
        this.extensionsForm.addControl(extension.serviceName, new FormControl(extension.isActive));
      });
    }
  }
}
