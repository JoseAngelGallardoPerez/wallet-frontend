import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() {
  }

  public setItem(key: string, data: string): void {
    return this.storage().setItem(key, data);
  }

  public removeItem(key): void {
    return this.storage().removeItem(key);
  }

  public getItem(key: string): string | null {
    return this.storage().getItem(key);
  }

  public clear(): void {
    return this.storage().clear();
  }

  private storage(): Storage {
    return localStorage;
  }
}
