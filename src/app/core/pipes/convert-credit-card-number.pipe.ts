import { Pipe, PipeTransform } from '@angular/core';
import { CardFormats } from '@constants/card-formats';

@Pipe({
  name: 'convertCreditCard'
})
export class ConvertCreditCardNumberPipe implements PipeTransform {

  transform(cardNumber: string, numberFormat: string): string {
    if (numberFormat === CardFormats.SIXTEEN_NUMERIC) {
      return cardNumber.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim()
        .replace(/(\d{4})\s/g, '**** ');
    }
    return cardNumber;
  }

}
