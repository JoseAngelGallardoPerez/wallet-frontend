import { Injectable } from '@angular/core';
import { APPLICATION_CONFIG } from '@environments/application-config';

@Injectable()
export class ConfigService {
  private configuration = APPLICATION_CONFIG;

  public get config() {
    return this.configuration;
  }
}
