import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessagingApiService } from '@shared-modules/messages-api/services/messaging-api.service';
import { AuthService } from '@services/auth/auth.service';
import { StorageService } from '@services/storage.service';

@Injectable()
export class AutoLogoutPopupService {
  public showPopupParams = new Subject<{ status: boolean, message: string, autoLogoutPadding: string }>();
  public userConfirm = new Subject<boolean>();
  private $isPopupShown = false;

  constructor(
    private messagingApiService: MessagingApiService,
    private auth: AuthService,
    private storage: StorageService,
  ) {
  }

  public autoLogout(confirmed: boolean): void {
    this.$isPopupShown = false;
    this.storage.removeItem('autoLogoutPopup');

    if (!confirmed) {
      this.auth.logOut();
    }

    this.userConfirm.next(true);
  }

  public showPopup(message: string, autoLogoutPadding: string): void {
    this.storage.setItem('autoLogoutPopup', 'active');
    this.showPopupParams.next({ status: true, message: message, autoLogoutPadding: autoLogoutPadding });
  }

  public hidePopup(): void {
    this.storage.removeItem('autoLogoutPopup');
    this.showPopupParams.next({ status: false, message: '', autoLogoutPadding: '' });
  }

  public isPopupShown(): boolean {
    return this.storage.getItem('autoLogoutPopup') === 'active';
  }
}
