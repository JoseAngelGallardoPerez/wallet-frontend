import { mergeSnackKeysProperties } from '@helpers/stringHelpers';

export class BlockedIpAddressModel {
  public id: number;
  public ip: string;
  public createdAt: string;
  public isChecked = false;

  public static getSortFields(): string[] {
    return ['ip', '-ip', 'created_at', '-created_at'];
  }

  public constructor(params: object) {
    mergeSnackKeysProperties(this, params);
  }
}
