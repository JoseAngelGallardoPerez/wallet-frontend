import { Injectable } from '@angular/core';
import { StorageService } from '@services/storage.service';

@Injectable()
export class SessionService {

  constructor(
    private storage: StorageService,
  ) {}

  public resetLastActivity(): void {
    this.storage.setItem('lastActivity', Date.now().toString());
  }

  public isLastActivityExpired(timeout: string): boolean {
    const timeoutMs = parseInt(timeout, 10) * 1000;
    const lastActivity = parseInt(this.storage.getItem('lastActivity'), 10);

    if (isNaN(lastActivity)) {
      return true;
    }

    return lastActivity <= Date.now() - timeoutMs;
  }
}
