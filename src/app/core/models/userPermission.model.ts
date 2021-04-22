export class UserPermissionModel {
  public actionKey: string;
  isAllowed: boolean;
  userId: string;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
