import { IUser } from '@interfaces/user-interface';

export interface RegistrationRequestInterface {
  cancellationReason: string;
  createdAt: string;
  id: number;
  status: string;
  uid: string;
  updatedAt: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  user: IUser;
}
