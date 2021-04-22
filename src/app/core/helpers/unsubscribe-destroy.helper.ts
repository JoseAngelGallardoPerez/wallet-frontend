import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class UnsubscribeDestroyHelper implements OnDestroy {
  protected unsubscribeSubject = new Subject();

  public ngOnDestroy() {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }
}
