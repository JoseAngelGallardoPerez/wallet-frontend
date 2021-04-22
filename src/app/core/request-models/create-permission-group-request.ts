import { PermissionGroupActionRequest } from '@request-models/permission-group-action-request';

export class CreatePermissionGroupRequest {
  public id?: number;
  public scope?: string;
  public name: string;
  public description: string;
  public actions: PermissionGroupActionRequest[];

  constructor(data: any) {
    this.name = data.name;
    this.description = data.description;
    this.scope = data.scope;
    this.actions = Object.keys(data.actions)
        .map((key) => new PermissionGroupActionRequest({ key, enabled: data.actions[key] }));
  }
}
