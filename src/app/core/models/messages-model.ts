export class Talker {
  uid: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  roleName: string;
  file: {
    location: string,
  };

  public constructor(params: any) {
    Object.assign(this, params);
  }

  public isAdmin(): boolean {
    return this.roleName === 'admin' || this.roleName === 'root';
  }

  public isSystem(): boolean {
    return this.uid === '' || !this.uid;
  }

  public getFullName(isCurrentUserAdmin: any): string {
    return this.isAdmin() && this.username !== 'system' && !isCurrentUserAdmin ?
      'Administrator' : this.firstName + ' ' + this.lastName;
  }
}

export class Message {
  id: number;
  parentId: any;
  children: null | Message[];
  subject: string;
  message: string;
  sender: Talker;
  senderId: string;
  recipient: Talker;
  recipientId: string;
  isSenderRead: boolean;
  isRecipientRead: boolean;
  createdAt: string;
  updatedAt: string;
  lastMessageCreatedAt: string;
  edited: boolean;
  isContextMenuShown = false;
  isEditMode = false;
  deleteAfterRead: boolean;

  constructor(
    message: Message
  ) {
    this.id = message.id;
    this.parentId = message.parentId;
    this.children = message.children ? message.children.map((item) => new Message(item)) : null;
    this.subject = message.subject;
    this.message = message.message;
    // @TODO: refactor
    this.sender = message.sender ? new Talker(message.sender) : new Talker({
      firstName: 'System',
      lastName: '',
      username: 'system',
      roleName: 'root'
    });
    this.recipient = message.recipient ? new Talker(message.recipient) : new Talker({
      firstName: 'Administrator',
      lastName: '',
      username: 'administrator',
      roleName: 'admin'
    });
    this.senderId = message.senderId;
    this.recipientId = message.recipientId;
    this.isSenderRead = message.isSenderRead;
    this.isRecipientRead = message.isRecipientRead;
    this.createdAt = message.createdAt;
    this.updatedAt = message.updatedAt;
    this.lastMessageCreatedAt = message.lastMessageCreatedAt;
    this.edited = message.edited;
    this.deleteAfterRead = message.deleteAfterRead;
  }
}
