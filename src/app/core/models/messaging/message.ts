import { Participant } from '@models/messaging/participant';

export class Message {
  id: string;
  senderId: string;
  sender: Participant;
  body: string;
  createdAt: string;
  updatedAt: string;

  public constructor(params: any) {
    Object.assign(this, params);
  }
}
