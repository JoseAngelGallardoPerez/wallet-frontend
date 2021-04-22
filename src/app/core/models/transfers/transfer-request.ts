class User {
  public id: string;
  public username: string;
  public email: string;
  public firstName: string;
  public lastName: string;

  constructor(params: any) {
    Object.assign(this, params);
  }

  public humanId(): string {
    const fullName = `${this.firstName.trim()} ${this.lastName.trim()}`.trim();
    if (fullName) {
      return `${fullName} ( ${this.email} )`;
    }

    return this.email;
  }
}

export class TransferRequest {
  public id: number;
  public userId: string;
  public status: string;
  public subject: string;
  public baseCurrencyCode: string;
  public amount: string;
  public createdAt: string;
  public statusChangedAt: string;
  public user: User;

  public constructor(params: any) {
    Object.assign(this, params);
    this.user = new User(params.user);
  }
}
