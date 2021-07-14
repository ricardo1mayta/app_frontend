import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rol',
})
export class RolPipe implements PipeTransform {
  transform(value: number): unknown {
    if (value === 1) {
      return 'Admin';
    }
    if (value === 2) {
      return 'Cliente';
    }
    if (value === 3) {
      return 'Jugador';
    }
    return 'Sin Rol';
  }
}
