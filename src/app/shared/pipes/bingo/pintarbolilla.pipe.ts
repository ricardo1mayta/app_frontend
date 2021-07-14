import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pintarbolilla',
})
export class PintarbolillaPipe implements PipeTransform {
  transform(args: any[]): any {
    return 'ok';
  }
}
