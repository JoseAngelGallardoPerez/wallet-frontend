import { mergeSnackKeysProperties } from '@helpers/stringHelpers';

export class SecurityQuestionAnswer {
  public aid: number;
  public sqid: number;
  public uid: string;
  public answer: string;

  constructor(params: object) {
    mergeSnackKeysProperties(this, params);
  }
}
