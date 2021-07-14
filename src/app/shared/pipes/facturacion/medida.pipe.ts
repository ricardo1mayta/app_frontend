import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'medida',
})
export class MedidaPipe implements PipeTransform {
  transform(value: string, arr: any[]): string {
    let desc = '';
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].value === value) {
        desc = arr[i].viewValue;
      }
    }
    return desc;
  }
}
