import { SettingsTanDataInterface } from '@interfaces/settings-tan-interface/settings-tan-data.interface';

export class SettingsTanObjectInterface {
  data: SettingsTanDataInterface[];
  error?: string | boolean;
}

export class SettingTanObjectInterface {
  data: SettingsTanDataInterface;
  error?: string | boolean;
}
