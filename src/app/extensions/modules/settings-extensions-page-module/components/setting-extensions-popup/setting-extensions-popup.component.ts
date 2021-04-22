import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ExtensionsService } from '@extensions/services/extensions.service';
import { UnsubscribeDestroyHelper } from '@helpers/unsubscribe-destroy.helper';
import { ExtensionsServiceSettingInterface } from '@extensions/interfaces/extensions-service-setting.interface';
import { DynamicValidatorService } from '@services/dynamic-validator.service';
import { VALIDATOR_NAME } from '@constants/dynamic-validator-names';

@Component({
  selector: 'app-setting-extensions-popup',
  templateUrl: './setting-extensions-popup.component.html',
  styleUrls: [
    './setting-extensions-popup.component.scss'
  ]
})
export class SettingExtensionsPopupComponent extends UnsubscribeDestroyHelper implements OnInit {
  @Input() public show = false;
  @Input() public headingMessage: string = null;
  @Input() public settingsTitle: string;
  @Input() public serviceName: string;
  @Input() public settingsData: ExtensionsServiceSettingInterface[] = null;

  @Output() hidePopup = new EventEmitter<boolean>();

  public object = Object;

  public width = 100;
  public settingsExtensionsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private extensionsService: ExtensionsService,
    private dynamicValidatorService: DynamicValidatorService,
  ) {
    super();
  }

  ngOnInit() {
    this.formInit();
  }

  private formInit(): void {
    this.settingsExtensionsForm = this.fb.group({});

    if (this.settingsData && this.settingsData.length) {
      this.settingsData.forEach((setting: ExtensionsServiceSettingInterface) => {
        if (setting.inputType === 'select' && setting.options && Object.keys(setting.options).length) {
          this.addSelectItems(setting);
        }

        if (!setting.validators) {
          this.settingsExtensionsForm.addControl(
            setting.name,
            new FormControl(
              setting.value,
              [Validators.required]
            )
          );
        } else {
          this.dynamicValidatorService.addNecessaryValidatorsToField(setting,
            [{ name: VALIDATOR_NAME.required }]);
          this.settingsExtensionsForm.addControl(
            setting.name,
            new FormControl(
              setting.value,
              this.dynamicValidatorService.returnValidatorsArray(setting)
            )
          );
        }
      });
    }
  }

  private addSelectItems(setting: ExtensionsServiceSettingInterface): void {
    setting.selectItems = [];

    Object.keys(setting.options).forEach((option: any) => {
      setting.selectItems.push({ key: setting.options[option], value: option });
    });
  }

  public cancel(): void {
    this.settingsData.forEach((setting: ExtensionsServiceSettingInterface) => {
      this.settingsExtensionsForm.get(setting.name).setValue(setting.value);
    });
    this.hidePopup.emit(true);
  }

  public submit(): void {
    if (this.settingsExtensionsForm.valid) {
      const formValue: { [key: string]: string } = this.convertDataType({ ...this.settingsExtensionsForm.value });

      this.extensionsService.updateExtensionsSettings(this.serviceName, formValue)
        .pipe(
          takeUntil(this.unsubscribeSubject),
        ).subscribe((data) => {
        if (!data.error) {
          this.hidePopup.emit(true);
        }
      });
    }
  }

  private convertDataType(formValue): { [key: string]: string } {
    Object.keys(formValue).forEach((settingName: string) => {
      formValue[settingName] = this.extensionsService.valueToType(
        this.settingsData.find((setting: ExtensionsServiceSettingInterface) => setting.name === settingName).dataType,
        formValue[settingName]
      );
    });
    return formValue;
  }
}
