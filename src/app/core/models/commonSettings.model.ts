import { snakeToCamelCase } from '@helpers/stringHelpers';

export class CommonSettingsModel {
  public id: number;
  public name: string;
  public value: string;
  public description: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = snakeToCamelCase(data.name);
    this.value = data.value;
    this.description = data.description;
  }
}
