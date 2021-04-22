import { IUser } from '@interfaces/user-interface';
import { RegistrationRequestInterface } from '@interfaces/registration-request.interface';

export class RegistrationRequestModel implements RegistrationRequestInterface {
  cancellationReason: string;
  createdAt: string;
  id: number;
  status: string;
  uid: string;
  updatedAt: string;
  user: IUser;

  public constructor(params: any) {
    Object.assign(this, params);
  }
}
