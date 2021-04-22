import { User } from '@models/users/user';

export class Participant {
  id: string;
  user: User;

  public constructor(params: any) {
    Object.assign(this, params);
  }
}
