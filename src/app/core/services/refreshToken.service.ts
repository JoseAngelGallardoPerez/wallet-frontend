import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StorageService } from '@services/storage.service';

@Injectable()
export class RefreshTokenService {
  public storage: Subject<any> = new Subject<any>();

  public constructor(
    private storageService: StorageService,
  ) {
    const self = this;
    window.addEventListener('beforeunload', function () {
      self.setProcessing(false);
    });
  }

  public isProcessing(): boolean {
    return this.storageService.getItem('refresh') === 'pending';
  }

  public setProcessing(status: boolean) {
    if (!status) {
      this.storageService.removeItem('refresh');
      return;
    }

    this.storageService.setItem('refresh', 'pending');
  }

  public publish(value: any) {
    this.storage.next(value);
  }
}
