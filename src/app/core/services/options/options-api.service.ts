/**
 * @license
 *
 * Use of this source code is governed by an CC BY-NC-ND 4.0 license that can be
 * found in the LICENSE file at https://creativecommons.org/licenses/by-nc-nd/4.0
 */
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ApiCallerService } from '../api-caller.service';
import { ConfigService } from '@app/config.service';
import { Observable } from 'rxjs';
import { CallResponceInterface } from '@interfaces/callResponce.interface';
import { StoreOptionsModel } from '@models/option.model';

@Injectable()
export class OptionsApiService {

  public constructor(
    private http: HttpClient,
    private apiCallerService: ApiCallerService,
    private configService: ConfigService
  ) {
  }

  public apiLoadOptions(path: string, publicPath: boolean): Observable<CallResponceInterface> {
    return this.apiCallerService.call(() => (
      this.http.get(
        publicPath ? this.configService.config.api.options.loadPublic(path) : this.configService.config.api.options.load(path),
      )
    ), `apiLoadOptions_${ path }`);
  }

  public apiUpdateOptions(options: StoreOptionsModel): Observable<CallResponceInterface> {
    return this.apiCallerService.call(() => (
      this.http.put(
        this.configService.config.api.options.update,
        {
          data: options.options
        }
      )
    ), 'apiUpdateOptions');
  }
}
