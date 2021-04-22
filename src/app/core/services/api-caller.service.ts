/**
 * @license
 *
 * Use of this source code is governed by an CC BY-NC-ND 4.0 license that can be
 * found in the LICENSE file at https://creativecommons.org/licenses/by-nc-nd/4.0
 */
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CallResponceInterface } from '@interfaces/callResponce.interface';
import { ErrorHandlerService } from '@services/error-handler.service';
import { ApiError } from '@models/api-error.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ApiCallerService {
  /**
   * @type {any}
   */
  private $subscriptionsPool: { [index: string]: Subscription } = {};

  /**
   * ApiService constructor.
   * @param {HttpClient} http
   * @param spinner
   */
  public constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
  ) {
  }

  /**
   * Make api call, handle errors, alerts and validation errors
   * @param {Function} api
   * @param {string} name
   * @returns {Observable<any>}
   */
  public call(api: Function, name: string): Observable<any> {
    const subject$: Subject<CallResponceInterface> = new Subject<CallResponceInterface>();
    const observable: Observable<CallResponceInterface> = subject$.asObservable();

    if (this.$subscriptionsPool.hasOwnProperty(name)) {
      this.$subscriptionsPool[name].unsubscribe();
    }

    this.$subscriptionsPool[name] = api()
      .subscribe(
        (response: any) => {
          subject$.next({
            data: response && response.data || {}, error: false, links: response && response.links || response && response.pagination || {},
            includeEntities: response && response.includeEntities || null
          });
        },
        (error: HttpErrorResponse) => {
          this.spinner.hide();
          const errors: ApiError[] = error && error.error && error.error.errors ?
            ErrorHandlerService.generateApiErrors(error.error.errors) : [];
          subject$.next({ data: errors || {}, error: true });
          subject$.complete();
        },
        () => {
          subject$.complete();
        }
      );

    return observable;
  }
}
