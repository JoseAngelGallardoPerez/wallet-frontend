import { ExtensionsValidatorInterface } from '@extensions/interfaces/extensions-validator.interface';
import { SelectItemInterface } from '@interfaces/selectItemInterface';

export interface ExtensionsServiceSettingInterface {
  name: string;
  value: any;
  label: string;
  description: string;
  dataType: string;
  inputType: string;
  inputValue: string;
  options: any | any[];
  nullable: boolean;
  validators: ExtensionsValidatorInterface[];
  selectItems?: SelectItemInterface[];
}
