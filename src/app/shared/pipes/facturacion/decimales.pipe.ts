import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimales',
})
export class DecimalesPipe implements PipeTransform {
  transform(value: number): string {
    return value.toFixed(2);
  }
}
