import { Injectable } from '@angular/core';
import { AsynchronousApiService } from '@lib/common-modules/asynchronous-generalisation/services/asynchronous-api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import {
  DataJobsInterface,
  JobsInterface
} from '@lib/common-modules/asynchronous-generalisation/interfaces/jobs.interface';
import { Subject } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorService } from '@services/apiError.service';
import { AuthService } from '@services/auth/auth.service';
import { StorageService } from '@services/storage.service';

@Injectable()
export class AsynchronousService {

  public asyncCallback: Subject<any> = new Subject();
  private dataResponse: JobsInterface;
  private storageJobsId: string;
  private numberOfJobs;
  private counter = 0;
  private STORAGE_NAME = 'asynchronous-id';
  private timeout = 0;

  constructor(
    private asynchronousApiService: AsynchronousApiService,
    private notificationsService: NotificationsService,
    private spinner: NgxSpinnerService,
    private errorService: ApiErrorService,
    private authService: AuthService,
    private LocalStorageService: StorageService,
  ) {
    this.checkStorageNote();
  }

  public checkStorageNote(): void {
    this.storageJobsId = this.LocalStorageService.getItem(this.STORAGE_NAME);
    if (this.storageJobsId && !this.dataResponse) {
      this.startPublicJobs(this.storageJobsId);
    }
  }

  public startPublicJobs(jobsId: string, numberOfJobs = 50, timeout = 5000): void {
    if (!this.counter) {
      this.getPublicJobs(jobsId);
      this.numberOfJobs = numberOfJobs;
      this.timeout = timeout;
    }
  }

  private getPublicJobs(jobsId: string): void {
    this.asynchronousApiService.apiGetPublicJobs(jobsId)
      .pipe(
        map((data: DataJobsInterface) => {
            this.dataResponse = data.data;
            return data.data.status;
        })
      ).subscribe(
        (status: string) => {
          this.spinner.show();
          this.counter++;
          // status = this.counter < 4 ? 'processing' : status; // temp solution remove after normal pecunia work
          status = this.counter < this.numberOfJobs ? status : 'timeout';
          switch (status) {
            case 'processing':
              this.processingWorker(jobsId);
              break;
            case 'completed':
              this.completedWorker(jobsId);
              break;
            case 'failed':
            case 'timeout':
              this.failedWorker(jobsId);
              break;
            default:
              break;
          }
        },
      (error) => {
          this.finishRequest(jobsId);
        }
      );
  }

  private processingWorker(jobsId: string): void {
    setTimeout(() => {
      this.getPublicJobs(jobsId);
    }, this.timeout);

    this.drawSpinnerText();
    this.saveIdInLocalStorage(jobsId);
  }

  private completedWorker(jobsId) {
    if (this.dataResponse.result.errors && this.dataResponse.result.errors.length) {
      const dataError: HttpErrorResponse = new HttpErrorResponse({ error: { errors: this.dataResponse.result.errors } } );
      if (this.storageJobsId) {
        this.notificationsService.error('Your process failed', 'Try again.');
      }
      this.errorService.handleErrorResponse(dataError);
      this.asyncCallback.next({ data: this.dataResponse.result.errors || {}, error: true });
    } else if (this.dataResponse.result.data) {
      this.asyncCallback.next({ data: this.dataResponse.result.data || {}, error: false });
      this.notificationsService.success('Your process', 'Successfully finished.');
    } else {
      this.notificationsService.error('Something went wrong', 'No data.');
    }

    this.finishRequest(jobsId);
  }

  private failedWorker(jobsId): void {
    this.notificationsService.error('Something went wrong', 'Status failed');
    this.finishRequest(jobsId);
  }

  private finishRequest(jobsId: string): void {
    this.removeIdFromLocalStorage();
    this.asynchronousApiService.apiDeletePublicJobs(jobsId);
    this.counter = 0;
    this.spinner.hide();
  }

  private drawSpinnerText() {
    const spinner = document.querySelector('.black-overlay');
    if (spinner && this.counter <= 1) {
      const spinnerTextElem = document.createElement('div');
      spinnerTextElem.classList.add('spinner-text', 'text_color-main_color');
      spinnerTextElem.innerText = 'Please wait - Processing account application.';
      spinner.appendChild(spinnerTextElem);
    }
  }

  private saveIdInLocalStorage(jobsId: string): void {
    const storageJobsId = this.LocalStorageService.getItem(this.STORAGE_NAME);
    if (jobsId !== storageJobsId) {
      this.LocalStorageService.setItem(this.STORAGE_NAME, jobsId);
    }
  }

  private removeIdFromLocalStorage() {
    this.LocalStorageService.removeItem(this.STORAGE_NAME);
  }
}
