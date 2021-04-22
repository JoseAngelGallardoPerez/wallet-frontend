import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fillArray'
})
export class FillArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return (new Array(value)).fill(1);
  }

}
