export class CreateUserGroupRequest {
  public id: number;
  public name: string;
  public description: string;

  constructor(data: object) {
    Object.assign(this, data);
  }
}
