import { Injectable } from '@angular/core';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateParser } from '@ngx-translate/core';

@Injectable()
export class CustomMissingTranslationHandler implements MissingTranslationHandler {
  constructor(private parser: TranslateParser) {
  }

  handle(params: MissingTranslationHandlerParams): string {
    const keys = params.key.split(/\.(?=[\w{<])/);
    return this.parser.interpolate(keys[keys.length - 1], params.interpolateParams);
  }
}
