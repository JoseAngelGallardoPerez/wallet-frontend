export class PermissionGroupAction {
  public id: number;
  public name: string;
  public key: string;
  public description: string;
  public createdAt: number;
  public updatedAt: number;

  constructor(params: object) {
    Object.assign(this, params);
  }
}
