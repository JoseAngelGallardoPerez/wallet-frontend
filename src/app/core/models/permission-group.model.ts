import { mergeSnackKeysProperties } from '@helpers/stringHelpers';

export class PermissionGroup {
  id: number;
  name: string;
  description: string;

  public constructor(params: object) {
    mergeSnackKeysProperties(this, params);
  }
}
