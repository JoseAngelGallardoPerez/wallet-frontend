import { ActivatedRoute } from '@angular/router';
import { DatepickerOptions } from 'ng2-datepicker';

export class CreateDatepickerOptionsComponent {

  public dateFromOptions: DatepickerOptions;
  public dateToOptions: DatepickerOptions;

  constructor(
    protected route: ActivatedRoute
  ) {

  }

  protected createDatepickerOptions(): void {
    const baseOptions = this.route.snapshot.data.datepickerOptions;
    this.dateFromOptions = Object.assign({
      barTitleFormat: 'MMMM[,] YYYY',
      placeholder: 'Date from'
    }, baseOptions);
    this.dateToOptions = Object.assign({
      barTitleFormat: 'MMMM[,] YYYY',
      placeholder: 'Date to',
      addStyle: { 'border-left': 'none' }
    }, baseOptions);
  }
}
