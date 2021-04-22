import { TextDictionary } from '@constants/textDictionary';

export class TranslateService {
  public static t(key: string): string {
    return TextDictionary.get(key) || TranslateService.getMessingTranslationText(key);
  }

  private static getMessingTranslationText(key: string): string {
    return `Missing translation for code: ${key}`;
  }
}
