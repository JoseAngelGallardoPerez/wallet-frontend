import { OptionModel } from '@models/option.model';
import { OptionsPrefixes } from '@app/core/constants/optionsPrefixes';
import { camelCaseToSnakeCase, snakeToCamelCase } from '@helpers/stringHelpers';

export class OptionsHelper {

  private readonly fieldPrefix: string;
  private readonly fieldRegExp: RegExp;
  private trueValue = 'yes';
  private falseValue = 'no';

  constructor(fieldPrefix: OptionsPrefixes) {
    this.fieldPrefix = fieldPrefix;
    this.fieldRegExp = new RegExp(`^${this.fieldPrefix}(\\w+)$`);
  }

  public optionToPureObject(option: OptionModel): { [key: string]: boolean | string } | null {
    const key: string | null = this.parsePath(option.path);
    return key ? { [key]: this.parseValue(option.value) } : null;
  }

  public optionsArrayToPureObject(options: OptionModel[]): { [key: string]: boolean | string } {
    const result: { [key: string]: any } = {};
    options.forEach((option) => {
      const parsedKey = this.parsePath(option.path);
      if (parsedKey) {
        result[this.parsePath(option.path)] = this.parseValue(option.value);
      }
    });
    return result;
  }

  public serializePureObjectToOptionsArray(pureObject: { [key: string]: boolean | string }): OptionModel[] {
    return Object.keys(pureObject).map((key): OptionModel => {
      return new OptionModel({
        path: this.serializePath(key),
        value: this.serializeValue(pureObject[key])
      });
    });
  }

  public parseValue(value: string): boolean | string {
    if (value === this.trueValue) {
      return true;
    }
    if (value === this.falseValue) {
      return false;
    }
    return value;
  }

  private parsePath(path: string): string | null {
    const data = path.match(this.fieldRegExp);
    return data ? snakeToCamelCase(data[1]) : null;
  }

  private serializePath(path: string): string {
    return `${this.fieldPrefix}${camelCaseToSnakeCase(path)}`.replace('iso_2', 'iso2'); // @TODO: refactor this temporary solution
  }

  private serializeValue(value: boolean | string): string {
    if (typeof value === 'boolean') {
      return value ? this.trueValue : this.falseValue;
    }
    return value;
  }
}
