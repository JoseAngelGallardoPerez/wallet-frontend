import { mergeSnackKeysProperties } from '@helpers/stringHelpers';

export class SecurityQuestion {
  public sqid: number;
  public question: string;

  constructor(params: object) {
    mergeSnackKeysProperties(this, params);
  }
}
