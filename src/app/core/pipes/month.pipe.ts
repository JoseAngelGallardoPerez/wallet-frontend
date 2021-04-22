import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data.min';

@Pipe({
  name: 'month'
})
export class MonthPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return moment().month(value).format('MMM');
  }

}
