import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@lib/config.service';
import { ApiCallerService } from '@services/api-caller.service';
import { CallResponceInterface } from '@interfaces/callResponce.interface';
import { Observable } from 'rxjs';

@Injectable()
export class AsynchronousApiService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private apiCallerService: ApiCallerService,
  ) {
  }

  public apiGetPublicJobs(jobsId: string): any {
    return this.httpClient.get(
      this.configService.config.api.asynchronous.jobs(jobsId)
    );
  }

  public apiDeletePublicJobs(jobsId: string): Observable <CallResponceInterface> {
    return this.apiCallerService.call( () => (
        this.httpClient.delete(
          this.configService.config.api.asynchronous.jobs(jobsId)
        )
      ), 'apiDeletePublicJobs'
    );
  }
}
