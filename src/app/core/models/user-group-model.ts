import { UserGroupInterface } from '@interfaces/user-group-interface';
import { mergeSnackKeysProperties } from '@helpers/stringHelpers';

export class UserGroup implements UserGroupInterface {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  disabled?: boolean;

  public static getSortFields(): string[] {
    return ['name', '-name', 'description', '-description'];
  }

  public constructor(params: object) {
    mergeSnackKeysProperties(this, params);
  }

}
