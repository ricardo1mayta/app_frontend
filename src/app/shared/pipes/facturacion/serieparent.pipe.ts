import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serieparent',
})
export class SerieparentPipe implements PipeTransform {
  transform(arr: any[], val: string): any[] {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].iprodcuto === val) {
        res.push(arr[i]);
      }
    }
    console.log(res);
    return res;
  }
}
