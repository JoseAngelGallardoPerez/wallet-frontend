import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {

  constructor() {
  }

 public setItem(key: string, data: string): void {
   sessionStorage.setItem(key, data);
 }

  public getItem(key: string): string {
    return sessionStorage.getItem(key);
  }

  public removeItem(key: string): void {
    if (sessionStorage.getItem(key) !== null) {
      sessionStorage.removeItem(key);
    }
  }
}
