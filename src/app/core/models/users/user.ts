
export class User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  roleName: string;
  userGroupId: number;

  public constructor(params: any) {
    Object.assign(this, params);
  }
}
