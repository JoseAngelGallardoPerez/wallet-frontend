export class PermissionGroupActionRequest {
  public key: string;
  public enabled: boolean;

  constructor(data: { key: string, enabled: boolean }) {
    this.key = data.key;
    this.enabled = data.enabled;
  }
}
