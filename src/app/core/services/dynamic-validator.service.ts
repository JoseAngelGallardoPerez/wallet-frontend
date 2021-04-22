import { Injectable } from '@angular/core';
import { ExtensionsServiceSettingInterface } from '@extensions/interfaces/extensions-service-setting.interface';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { STATIC_VALIDATORS_LIST, VALIDATOR_NAME, VALIDATORS_DATA_TYPE } from '@constants/dynamic-validator-names';
import { ExtensionsDataValidatorsInterface, ExtensionsValidatorInterface } from '@extensions/interfaces/extensions-validator.interface';
import { minCharactersValidator } from '@validators/min-characters.validator';
import { maxCharactersValidator } from '@validators/max-characters.validator';

@Injectable()
export class DynamicValidatorService {

  public returnValidatorsArray(setting: ExtensionsServiceSettingInterface | ExtensionsDataValidatorsInterface): ValidatorFn[] {
    const validatorsArray = [];

    if (setting.dataType === VALIDATORS_DATA_TYPE.string) { // todo change max on maxLength on back-end
      this.convertValidatorNameFromType(setting);
    }

    if (setting['label'] === 'Maximum number of characters') { // it's temporary solution - to think how rename it on Back-end
      setting.validators.forEach((validator: ExtensionsValidatorInterface) => {
        if (STATIC_VALIDATORS_LIST[validator.name]) {
          validatorsArray.push(STATIC_VALIDATORS_LIST[validator.name]);
        } else if (validator.options && validator.options.value) {
          if (validator.name === VALIDATOR_NAME.max) {
            validatorsArray.push(maxCharactersValidator(validator.options.value));
          }

          if (validator.name === VALIDATOR_NAME.min) {
            validatorsArray.push(minCharactersValidator(validator.options.value));
          }
        }
      });

      return validatorsArray;
    }

    setting.validators.forEach((validator: ExtensionsValidatorInterface) => {
      if (STATIC_VALIDATORS_LIST[validator.name]) {
        validatorsArray.push(STATIC_VALIDATORS_LIST[validator.name]);
      } else if (validator.options && validator.options.value) {
        validatorsArray.push(this.getConfigurableValidator(validator));
      }
    });

    return validatorsArray;
  }

  public setValidatorToForm(form: FormGroup, fields: ExtensionsDataValidatorsInterface[]) {
    if (fields && fields.length) {
      fields.forEach((field: ExtensionsDataValidatorsInterface) => {
        if (form.get(field.name)) {
          form.get(field.name).setValidators(this.returnValidatorsArray(field));
        }
      });
    }
  }

  public addNecessaryValidatorsToField(field: ExtensionsDataValidatorsInterface, necessaryValidators?: ExtensionsValidatorInterface[]) {
    if (necessaryValidators) {
      necessaryValidators.forEach((validator: ExtensionsValidatorInterface) => {
        field.validators.push(validator);
      });
    }

    if (field.dataType === VALIDATORS_DATA_TYPE.int32) {
      field.validators.push({ name: VALIDATOR_NAME.onlyNumeric });
    }
  }

  private getConfigurableValidator(validator: ExtensionsValidatorInterface): ValidatorFn {
    switch (validator.name) {
      case VALIDATOR_NAME.min:
        return Validators.min(validator.options.value);
      case VALIDATOR_NAME.max:
        return Validators.max(validator.options.value);
      case VALIDATOR_NAME.minLength:
        return Validators.minLength(validator.options.value);
      case VALIDATOR_NAME.maxLength:
        return Validators.maxLength(validator.options.value);
    }
  }

  private convertValidatorNameFromType(setting: ExtensionsDataValidatorsInterface) {
    setting.validators.forEach((validator: ExtensionsValidatorInterface) => {
      if (validator.name === VALIDATOR_NAME.max) {
        validator.name = VALIDATOR_NAME.maxLength;
      }

      if (validator.name === VALIDATOR_NAME.min) {
        validator.name = VALIDATOR_NAME.minLength;
      }
    });
  }
}
