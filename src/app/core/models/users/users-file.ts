export interface IUsersFile {
  id: number;
  path: string;
  filename: string;
  storage: string;
  contentType: string;
  size: number;
  isAdminOnly: boolean;
  isPrivate: boolean;
}

export class UsersFile {
  public id: number;
  public path: string;
  public filename: string;
  public storage: string;
  public contentType: string;
  public size: number;
  public isAdminOnly: boolean;
  public isPrivate: boolean;

  constructor(data: UsersFile) {
    this.id = data.id;
    this.path = data.path;
    this.filename = data.filename;
    this.storage = data.storage;
    this.contentType = data.contentType;
    this.size = data.size;
    this.isAdminOnly = data.isAdminOnly;
    this.isPrivate = data.isPrivate;
  }
}
