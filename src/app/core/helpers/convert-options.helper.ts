import { OptionModel } from '@models/option.model';

export class ConvertOptionsHelper {

  public static convertOptionsToBoolean(Options): { [key: string]: boolean | string } {
    const newFormValue = {};
    Object.keys(Options).forEach((option) => {
      newFormValue[option] = Options[option] === 'enable' || Options[option] === 'enabled'
        ? true : Options[option] === 'disable' || Options[option] === 'disabled'
          ? false : Options[option];
    });
    return newFormValue;
  }

  public static convertFormValuesToOptions(formValues): { [key: string]: string } {
    const newOptionsValue = {};
    Object.keys(formValues).forEach((value) => {
      newOptionsValue[value] = formValues[value] === true ? 'enable' : formValues[value] === false ? 'disable' : formValues[value];
    });
    return newOptionsValue;
  }

  public static serializeFormValuesToOptionsArray(path: string, pureObject: { [key: string]: boolean | string }): OptionModel[] {
    return Object.keys(pureObject).map((key): OptionModel => {
      return new OptionModel({
        path: path + key,
        value: this.convertValueToOptions(pureObject[key])
      });
    });
  }

  public static convertValueToOptions(formValue): string {
    return formValue === true ? 'enable' : formValue === false ? 'disable' : formValue;

  }

}
