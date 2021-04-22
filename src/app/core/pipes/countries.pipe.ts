import { Pipe, PipeTransform } from '@angular/core';
import { COUNTRIES } from '@constants/countries';

@Pipe({
  name: 'countries'
})
export class CountriesPipe implements PipeTransform {
  transform(code: string): string {
    if (code.length > 0) {
      const countries = COUNTRIES;
      return countries.find((country) => code === country.code).name;
    }
  }

}
