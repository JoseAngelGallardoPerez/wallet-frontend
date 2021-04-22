import { Pipe, PipeTransform } from '@angular/core';
import { AppOptionsService } from '@services/appOptions.service';
import { optionsValuesNames } from '@app/core/constants/optionsPrefixes';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data.min';
import { UnsubscribeDestroyHelper } from '@helpers/unsubscribe-destroy.helper';
import { takeUntil } from 'rxjs/operators';

const DATE_ONLY_WITHOUT_TIMEZONE = 'dateOnlyWithoutTimezone';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe extends UnsubscribeDestroyHelper implements PipeTransform {
  private dateFormat = 'DD/MM/YYYY';
  private timeFormat = 'HH:mm';

  constructor(
    private appOptionService: AppOptionsService
  ) {
    super();
    this.subscribeToOptions();
  }

  transform(date: string, formatSize?: string): string {
    if (date && moment(date).isValid()) {
      return this.makeTransform(date, formatSize);
    }
    return '';
  }

  public returnTimeFormat(): string {
    return this.timeFormat;
  }

  private subscribeToOptions() {
    this.appOptionService.getOptionsValuePipe(optionsValuesNames.DEFAULT_DATE_FORMAT).pipe(
      takeUntil(this.unsubscribeSubject)
    ).subscribe((format: string) => {
      this.dateFormat = format || 'DD/MM/YYYY';
    });
  }

  private makeTransform(date: string, formatSize: string): string {
    if (formatSize === DATE_ONLY_WITHOUT_TIMEZONE) {
      return moment(date).format(this.dateFormat);
    }
    return moment(date).format(`${ this.dateFormat } ${ this.timeFormat }`);
  }
}
