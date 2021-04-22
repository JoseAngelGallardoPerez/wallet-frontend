import { Participant } from '@models/messaging/participant';
import { Message } from '@models/messaging/message';
import { User } from '@models/users/user';

export class Thread {
  id: number;
  senderId: string;
  sender: Participant;
  recentMessageSenderId: string;
  recipient: User;
  subject: string;
  participants: Participant[];
  readBy: Participant[];
  type: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  oneTime: boolean;
  meta: any;

  public constructor(params: any) {
    Object.assign(this, params);
  }

  public getTo(currentUid: string, isAdmin: boolean): string {
    if (isAdmin && this.meta && this.meta.toText) {
      return this.meta.toText;
    }

    if (!isAdmin) {
      return 'Administrator';
    }

    let toText = '';
    this.participants
      .filter(participant => participant.id !== currentUid &&
        participant.user.roleName !== 'admin' && currentUid && participant.user.roleName !== 'root')
      .forEach((participant, idx) => {
        const fullName = `${participant.user.firstName} ${participant.user.lastName}`;
        toText = toText !== '' ? `${toText}, ${fullName}` : fullName;
      });
    if (toText.length > 40) {
      toText = toText.substring(0, 40);
      toText = toText + '...';
    }
    return toText;
  }

  public getRecipientsString(currentUid: string): string {
    let toText = '';
    this.participants
      .filter(participant => participant.id !== currentUid && participant.user &&
        participant.user.roleName !== 'admin' && currentUid && participant.user.roleName !== 'root')
      .forEach((participant, idx) => {
        const fullName = `${participant.user.firstName} ${participant.user.lastName}`;
        toText = toText !== '' ? `${toText}, ${fullName}` : fullName;
      });
    return toText;
  }

  public getFrom(isAdmin: boolean): string {
    if (!isAdmin && this.senderId !== 'system') {
      return 'Administrator';
    }

    if (this.senderId === 'system') {
      return 'System';
    }
    const from = `${this.recipient.firstName} ${this.recipient.lastName}`;
    return from.length > 40 ? from.substring(0, 40) + '...' : from;
  }

  public getSubject(): string {
    return this.subject.length > 40 && (this.subject.length !== 41 && this.subject.slice(-1) !== '.') ?
      this.subject.substring(0, 40) + '...' : this.subject;
  }

  public isUnread(currentUid): boolean {
    return this.readBy.map(participant => participant.id).indexOf(currentUid) === -1;
  }
}
