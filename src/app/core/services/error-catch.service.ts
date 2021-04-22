import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ErrorCatchService implements ErrorHandler {
  constructor(
    private spinner: NgxSpinnerService,
  ) {
  }

  handleError(error: any) {
    this.spinner.hide();
    if (Error instanceof HttpErrorResponse) {
      console.error('HttpErrorResponse ' + error.name);
      console.error(error);
    } else if (Error) {
      console.error(error.name + ' ' + error.status);
      console.error(error);
    }
  }
}
