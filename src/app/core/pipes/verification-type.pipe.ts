import { Pipe, PipeTransform } from '@angular/core';
import { VERIFICATION_STATUSES } from '@constants/verification';

@Pipe({
  name: 'verificationType'
})
export class VerificationTypePipe implements PipeTransform {

  transform(value: string): any {
    const keyVerification = Object.keys(VERIFICATION_STATUSES).find(key => VERIFICATION_STATUSES[key].key === value);
    return VERIFICATION_STATUSES[keyVerification].value;
  }

}
