import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado',
})
export class EstadoPipe implements PipeTransform {
  transform(value: number): unknown {
    if (value === 1) {
      return 'Activo';
    }
    if (value === 0) {
      return 'InActivo';
    }

    return 'Sin Estado';
  }
}
