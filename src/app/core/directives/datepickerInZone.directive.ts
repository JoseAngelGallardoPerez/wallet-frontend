import { Directive, EventEmitter, HostListener, OnDestroy, Output } from '@angular/core';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data.min';

@Directive({
  selector: '[datepickerInZone]'
})
export class DatepickerInZoneDirective implements OnDestroy {

  @Output()
  public dateChange = new EventEmitter<any>();

  ngOnDestroy() {
    this.dateChange.complete();
  }

  @HostListener('ngModelChange', ['$event'])
  public onChange(event: Date) {
    this.dateChange.emit(moment.tz(event, Intl.DateTimeFormat().resolvedOptions().timeZone));
  }
}
